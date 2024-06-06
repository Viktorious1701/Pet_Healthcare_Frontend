import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { AppointmentAvailableVets } from "@/Models/Appointment";

interface BookingVetProps {
  vets: AppointmentAvailableVets[];
  onSelectVet: (vetUserName: string) => void;
}

const BookingVet: React.FC<BookingVetProps> = ({ vets, onSelectVet }) => {
  
  const handleVetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPetIdFromEvent = event.target.value;
    onSelectVet(selectedPetIdFromEvent);
  };

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
      className="max-w-md"
      variant="bordered"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-16",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider",
        },
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.data?.userName}
              className="flex-shrink-0"
              size="sm"
              src={item.data?.imageURL}
            />
            <div className="flex flex-col">
              {item.data?.id === "auto-assign" ? (
                <span className="text-small">{"Let us choose"}</span>
              ) : (
                <span className="text-small">
                  {"Dr. " + item.data?.firstName + " " + item.data?.lastName}
                </span>
              )}
              <span className="text-default-500 text-tiny">
                ({item.data?.email})
              </span>
            </div>
          </div>
        ));
      }}
      onChange={handleVetChange}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.userName}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.userName}
              className="flex-shrink-0"
              size="sm"
              src={user.imageURL}
            />
            <div className="flex flex-col">
              {user.id === "auto-assign" ? (
                <span className="text-small">{"Let us choose"}</span>
              ) : (
                <span className="text-small">
                  {"Dr. " + user.firstName + " " + user.lastName}
                </span>
              )}
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default BookingVet;
