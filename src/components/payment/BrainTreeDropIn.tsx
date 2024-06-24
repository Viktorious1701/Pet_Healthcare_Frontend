/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import dropin, { Dropin } from "braintree-web-drop-in";
import { Button } from "reactstrap";

import axiosInstance from '@/Helpers/axiosInstance';
import { toast } from 'react-toastify';

interface BraintreeDropInProps {
    show: boolean;
    onPaymentCompleted: () => void;
    appointmentId: number;
}

const BraintreeDropIn: React.FC<BraintreeDropInProps> = (props) => {
    const { show, onPaymentCompleted, appointmentId } = props;

    const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>(undefined);
    const [clientToken, setClientToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const response = await axiosInstance.get('https://pethealthcaresystem.azurewebsites.net/api/Payment/GenerateToken');
                setClientToken(response.data.data);
            } catch (error) {
                console.error('Token generation error:', error);
            }
        };

        const initializeBraintree = async () => {
            if (!clientToken) {
                await generateToken();
            }

            if (clientToken) {
                dropin.create({
                    authorization: clientToken,
                    container: '#braintree-drop-in-div',
                    card: {
                        // You can customize card options here if needed
                    },
                    // Prioritize credit card payments
                    paymentOptionPriority: ['card', 'paypal']
                }, (error, instance) => {
                    if (error) {
                        console.error('Drop-in error:', error);
                    } else {
                        setBraintreeInstance(instance);
                    }
                });
            }
        };

        if (show) {
            if (braintreeInstance) {
                braintreeInstance.teardown().then(() => {
                    initializeBraintree();
                });
            } else {
                initializeBraintree();
            }
        }

        return () => {
            if (braintreeInstance) {
                braintreeInstance.teardown();
            }
        };
    }, [show, clientToken]);

    const handlePayment = () => {
        if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                    console.error(error);
                } else {
                    const paymentMethodNonce = payload.nonce;
                    console.log("payment method nonce", paymentMethodNonce);

                    // Send nonce to your server
                    axiosInstance.post(`https://pethealthcaresystem.azurewebsites.net/api/Payment/Checkout`,
                        {
                            appointmentId: appointmentId,
                            nonce: paymentMethodNonce
                        }
                    )
                        .then(response => {
                            console.log('Payment response:', response.data);
                            toast('Payment completed successfully!');
                            onPaymentCompleted();
                        })
                        .catch(error => {
                            console.error('Payment error:', error);
                            alert(`Payment failed: ${error.message}`);
                        });
                }
            });
        }
    };

    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            <div id="braintree-drop-in-div" />
            <Button
                className="braintreePayButton bg-custom-pink"
                disabled={!braintreeInstance}
                onClick={handlePayment}
            >
                Pay
            </Button>
        </div>
    );
};

export default BraintreeDropIn;