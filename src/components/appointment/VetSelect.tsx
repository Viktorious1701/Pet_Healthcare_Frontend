// components/appointment/VetSelect.tsx

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
//import { vetGetAPI } from "@/Services/VetService";
import { toast } from "react-toastify";

interface VetSelectProps {
  onSelectVet: (vetId: string) => void;
}

interface Vet {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  imageURL: string;
}

const VetSelect: React.FC<VetSelectProps> = ({ onSelectVet }) => {
  const [vets, setVets] = useState<Vet[]>([]);
  const [selectedVet, setSelectedVet] = useState<string>("");

  useEffect(() => {
    fetchVets();
  }, []);

  const vetGetAPI = async () => {
    return [
      {
        id: "1",
        userName: "vet1",
        firstName: "John",
        lastName: "Doe",
        email: "",
        imageURL: "",
        },
    ];
    };
  const fetchVets = async () => {
    try {
        const res = await vetGetAPI();
        if (res) {
            setVets(res);
        }
    }catch (error) {
        toast.error("Failed to fetch vets");
    }
  };

  const handleVetChange = (vetId: string) => {
    setSelectedVet(vetId);
  };

  const handleCancel = () => {
    setSelectedVet("");
  };

  const handleSubmit = () => {
    if (selectedVet === "") {
      toast.warning("Please select a vet");
      return;
    }
    onSelectVet(selectedVet);
  };

  return (
    <div>
      <div className="flex justify-between mx-10 mb-6">
        <Button className="ml-2 bg-custom-darkBlue text-white text-md" onClick={handleSubmit}>
          Confirm
        </Button>
      </div>
      <Divider />
      <div className="flex items-center mx-10 mt-4">
        <Card className="shadow-none">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Selected Vet</p>
          </CardHeader>
          <CardBody className="pt-2">{selectedVet}</CardBody>
        </Card>
        {selectedVet && (
          <Button className="ml-4 bg-custom-lightCrimson text-white text-md" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
      <Divider />
      <div className="m-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {vets.map((vet, index) => (
          <Button
            key={index}
            className="bg-white shadow-lg shadow-custom-lightBlue h-auto"
            onClick={() => handleVetChange(vet.id)}
          >
            <Card className="shadow-none">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{vet.userName}</p>
                <small className="text-default-500">{vet.email}</small>
                <h4 className="font-bold text-large">
                  {vet.firstName + " " + vet.lastName}
                </h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={
                    vet.imageURL !== ""
                      ? vet.imageURL
                      : "https://nextui.org/images/hero-card-complete.jpeg"
                  }
                  width={270}
                />
              </CardBody>
            </Card>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VetSelect;
