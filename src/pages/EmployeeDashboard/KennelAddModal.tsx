import { KennelPost } from "@/Models/Kennel";
import { kennelPostAPI } from "@/Services/KennelService";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface KennelFormValues {
  description: string;
  capacity: number;
  dailyCost: number;
}

interface KennelAddModalProps {
  onKennelAdded: (kennel: KennelPost) => void;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required("description is required"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be greater than zero"),
  dailyCost: Yup.number()
    .required("Daily cost is required")
    .min(0.01, "Daily cost must be greater than zero"),
});

const KennelAddModal: React.FC<KennelAddModalProps> = ({ onKennelAdded }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KennelFormValues>({ resolver: yupResolver(validationSchema) });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKennelAdd = (kennel: KennelPost | any) => {
    onKennelAdded(kennel);
  }

  const onSubmit = async (data: KennelFormValues) => {
    const kennel = kennelPostAPI(data.description, data.dailyCost);
    reset({
      description: "",
      capacity: 0,
      dailyCost: 0,
    });
    toast.success("Kennel added successfully");
    onClose();
    handleKennelAdd(kennel);
  };
  return (
    <>
      <Button onPress={onOpen} className="bg-custom-pink text-md text-white">
        Add a new kennel
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Add a new kennel
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <BookText className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Description"
                  placeholder="Enter your kennel's description"
                  variant="bordered"
                  {...register("description")}
                />
                {errors.description && <p>{errors.description.message}</p>}
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
                  {...register("capacity")}
                />
                {errors.capacity && <p>{errors.capacity.message}</p>}
                <Input
                  endContent={
                    <DollarSign className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Daily Cost"
                  placeholder="Enter your kennel's daily cost"
                  min={0}
                  type="number"
                  variant="bordered"
                  {...register("dailyCost")}
                />
                {errors.dailyCost && <p>{errors.dailyCost.message}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default KennelAddModal;
