import BraintreeDropIn from "../components/payment/BrainTreeDropIn"

const PaymentPage = () => {
const handlePaymentCompleted = () => {
    console.log("Payment completed");
}    
  return (
    <div>
      <BraintreeDropIn show={true} onPaymentCompleted={handlePaymentCompleted} appointmentId={1}/>
    </div>
  )
}

export default PaymentPage
