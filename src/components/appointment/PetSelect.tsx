// components/appointment/PetSelect.tsx

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { toast } from "react-toastify";

interface PetSelectProps {
  customerUserName: string;
  onSelectPet: (petId: string) => void;
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  imageURL: string;
}

const PetSelect: React.FC<PetSelectProps> = ({ customerUserName, onSelectPet }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<string>("");

  useEffect(() => {
    fetchPets();
  }, [customerUserName]);

  const fetchPets = async () => {
    try {
      const res = await petsOfCustomerAPI(customerUserName);
      if (res?.data) {
        setPets(res?.data);
      }
    } catch (error) {
      toast.error("Failed to fetch pets");
    }
  };

  const handlePetChange = (petId: string) => {
    setSelectedPet(petId);
  };

  const handleCancel = () => {
    setSelectedPet("");
  };

  const handleSubmit = () => {
    if (selectedPet === "") {
      toast.warning("Please select a pet");
      return;
    }
    onSelectPet(selectedPet);
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
            <p className="text-tiny uppercase font-bold">Selected Pet</p>
          </CardHeader>
          <CardBody className="pt-2">{selectedPet}</CardBody>
        </Card>
        {selectedPet && (
          <Button className="ml-4 bg-custom-lightCrimson text-white text-md" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
      <Divider />
      <div className="m-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pets.map((pet, index) => (
          <Button
            key={index}
            className="bg-white shadow-lg shadow-custom-lightBlue h-auto"
            onClick={() => handlePetChange(pet.id)}
          >
            <Card className="shadow-none">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{pet.name}</p>
                <small className="text-default-500">{pet.species}</small>
                <h4 className="font-bold text-large">{pet.breed}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={
                    pet.imageURL !== ""
                      ? pet.imageURL
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

export default PetSelect;
