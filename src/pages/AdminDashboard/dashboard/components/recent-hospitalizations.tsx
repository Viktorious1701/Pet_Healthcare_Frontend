import { Hospitalization } from "@/Models/Hospitalization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@mui/material";
import React from "react";

interface RecentHospitalizationsProps {
  hospitalizations: Hospitalization[];
}
const now = new Date();
const RecentHospitalizations: React.FC<RecentHospitalizationsProps> = ({
  hospitalizations,
}) => {
  hospitalizations = hospitalizations.filter(
    (hospitalization) =>
      new Date(hospitalization.admissionDate).getMonth() === now.getMonth() ||
      new Date(hospitalization.dischargeDate).getMonth() === now.getMonth()
  );
  const getHospitalizationPaymentImage = (status: number) => {
    switch (status) {
      case 0:
        return "bg-blue-400";
      case 1:
        return "bg-success-500";
      case 2:
        return "bg-yellow-400";
      case 3:
        return "bg-red-400";
    }
  };
  const getHospitalizationPaymentStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Paid";
      case 2:
        return "Refunded";
      case 3:
        return "Failed";
    }
  };
  return (
    <div className="space-y-8">
      {hospitalizations.map((hospitalization) => (
        <div
          className="flex items-center"
          key={hospitalization.hospitalizationId}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback className="font-bold text-xs">
              {hospitalization.vetName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 w-[25vw]">
            <p className="text-sm font-medium leading-none flex justify-between">
              {hospitalization.petName}
              <span>
                from {hospitalization.admissionDate} to{" "}
                {hospitalization.dischargeDate}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Hospitalized by {hospitalization.vetName} in {hospitalization.kennelDescription}
            </p>
          </div>
          <Divider orientation="vertical" />
          <Badge
            className={
              getHospitalizationPaymentImage(hospitalization.paymentStatus) +
              " text-white p-2 ml-auto w-[7vw]"
            }
            variant="secondary"
          >
            Payment:{" "}
            {getHospitalizationPaymentStatus(hospitalization.paymentStatus) ??
              "Cash"}
          </Badge>
          <div className="ml-auto font-medium">
            +${hospitalization.totalCost}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentHospitalizations;
