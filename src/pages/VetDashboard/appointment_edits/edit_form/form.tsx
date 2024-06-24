import { AppointmentGet } from "@/Models/Appointment";
import {
  appointmentGetVetIdAPI,
  appointmentVetAPI,
} from "@/Services/AppointmentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AppointmentForm: React.FC<> = () => {
  const { appointmentId } = useParams(); // Step 2: Extract appointmentId from URL

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await appointmentGetVetIdAPI(); // Fetch the vet details
        const vetId = (response as unknown as { userId: string }).userId; // Type assertion
        if (vetId) {
          const appointmentId: number | undefined =
          await appointmentVetAPI(vetId); // Fetch appointments
          if (appointmentDetails) {
            // Update your form state with these details
            setAppointmentId(appointmentDetails.appointmentId);
            setCancellationDate(appointmentDetails.cancellationDate);
            setComments(appointmentDetails.comments);
            setCustomer(appointmentDetails.customer);
            setDate(appointmentDetails.date);
            setPaymentStatus(appointmentDetails.paymentStatus);
            setPet(appointmentDetails.pet);
            setRating(appointmentDetails.rating);
            setRefundAmount(appointmentDetails.refundAmount);
            setService(appointmentDetails.service);
            setSlotEndTime(appointmentDetails.slotEndTime);
            setSlotStartTime(appointmentDetails.slotStartTime);
            setStatus(appointmentDetails.status);
            setTotalCost(appointmentDetails.totalCost);
            setVet(appointmentDetails.vet);
          } else {
            console.error("Appointment not found");
          }
        }
      } catch (error) {
        console.error("Failed to fetch appointment details:", error);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]); // Dependency array to re-run the effect if appointmentId changes

  return (
    <form className="w-full p-10 bg-opacity-20 z-10 overflow-auto">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold mb-6">
            Edit Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <Label
                htmlFor="appointmentId"
                className="block text-xl font-normal"
              >
                Appointment ID
              </Label>
              <Input
                id="appointmentId"
                type="text"
                readOnly
                value={appointmentId} // Set the value to the state variable
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="customer" className="block text-xl font-normal">
                Customer
              </Label>
              <Input
                id="customer"
                type="text"
                readOnly
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <Label htmlFor="date" className="block text-xl font-normal">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                readOnly
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <Label
                htmlFor="cancellationDate"
                className="block text-xl font-normal"
              >
                Cancellation Date
              </Label>
              <Input
                id="cancellationDate"
                type="date"
                readOnly
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="comments" className="block text-xl font-normal">
                Comments
              </Label>
              <Input
                id="comments"
                type="text"
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>

            <div className="w-full px-3 mb-6">
              <Label
                htmlFor="paymentStatus"
                className="block text-xl font-normal"
              >
                Payment Status
              </Label>
              <Input
                id="paymentStatus"
                type="text"
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="pet" className="block text-xl font-normal">
                Pet
              </Label>
              <Input
                id="pet"
                type="text"
                readOnly
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            {/* <div className="w-full px-3 mb-6">
      <Label htmlFor="rating" className="block text-xl font-normal">Rating</Label>
      <Input id="rating" type="number" min="0" max="5" step="0.1" className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg" />
    </div>
    <div className="w-full px-3 mb-6">
      <Label htmlFor="refundAmount" className="block text-xl font-normal">Refund Amount</Label>
      <Input id="refundAmount" type="number" step="0.01" className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg" />
    </div> */}
            <div className="w-full px-3 mb-6">
              <Label htmlFor="service" className="block text-xl font-normal">
                Service
              </Label>
              <Input
                id="service"
                type="text"
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <Label
                htmlFor="slotStartTime"
                className="block text-xl font-normal"
              >
                Slot Start Time
              </Label>
              <Input
                id="slotStartTime"
                type="time"
                readOnly
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <Label
                htmlFor="slotEndTime"
                className="block text-xl font-normal"
              >
                Slot End Time
              </Label>
              <Input
                id="slotEndTime"
                type="time"
                readOnly
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="status" className="block text-xl font-normal">
                Status
              </Label>
              <Input
                id="status"
                type="text"
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="totalCost" className="block text-xl font-normal">
                Total Cost
              </Label>
              <Input
                id="totalCost"
                type="number"
                step="1"
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AppointmentForm;
