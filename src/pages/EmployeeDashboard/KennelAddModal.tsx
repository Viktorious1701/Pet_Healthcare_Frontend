import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { BookText, DollarSign, MemoryStick } from "lucide-react";

interface KennelFormValues {
    description: string,
    capacity: number,
    dailyCost: number
}

const KennelAddModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="bg-custom-pink text-md text-white">Add a new kennel</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <BookText className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Description"
                  placeholder="Enter your kennel's description"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <MemoryStick className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Capacity"
                  placeholder="Enter your kennel's capacity"
                  min={1}
                  max={4}
                  type="number"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <DollarSign className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Daily Cost"
                  placeholder="Enter your kennel's daily cost"
                  min={0}
                  type="number"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default KennelAddModal;
