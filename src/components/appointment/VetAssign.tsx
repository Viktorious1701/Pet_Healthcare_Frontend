import React from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { AppointmentAvailableVets } from "@/Models/Appointment";

interface VetAssignProps {
  vets: AppointmentAvailableVets[];
}

const VetAssign: React.FC<VetAssignProps> = ({ vets }) => {
  const autoAssignOption = {
    id: "auto-assign",
    userName: "Let us choose for you",
    firstName: "",
    lastName: "",
    email: "We'll assign the best available vet",
    imageURL: "/path/to/default/image.png", // Optional: a default image for this option
  };

  const allOptions = [autoAssignOption, ...vets];

  return (
    <Select
      items={allOptions}
      label="Assigned to"
      variant="bordered"
      isMultiline={true}
      selectionMode="single"
      placeholder="Select a user"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-12 py-2",
      }}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>
                {item.data?.id === "auto-assign"
                  ? "Clinic's Choice"
                  : "Dr. " + item.data?.firstName + " " + item.data?.lastName}
              </Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.userName}>
          {user.id === "auto-assign" ? (
            <div className="flex gap-2 items-center">
              <Avatar
                alt="Auto Assign"
                className="flex-shrink-0"
                size="sm"
                src="/path/to/default/image.png" // Optional: a default image for this option
              />
              <div className="flex flex-col">
                <span className="text-small">
                  Let the clinic choose the vet for you
                </span>
                <span className="text-tiny text-default-400">
                  We'll assign the best available vet
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Avatar
                alt={user.userName}
                className="flex-shrink-0"
                size="sm"
                src={user.imageURL}
              />
              <div className="flex flex-col">
                <span className="text-small">
                  {"Dr. " + user.firstName + " " + user.lastName}
                </span>
                <span className="text-tiny text-default-400">{user.email}</span>
              </div>
            </div>
          )}
        </SelectItem>
      )}
    </Select>
  );
};

export default VetAssign;
