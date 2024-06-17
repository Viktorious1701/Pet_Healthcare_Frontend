import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { customerGetAPI } from "@/Services/UserService";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { toast } from "react-toastify";
import { HospitalizationPost } from "@/Models/Hospitalization"; // Adjust import path as per your structure
import { UserGet } from "@/Models/User";
import { PetGet } from "@/Models/Pet";

interface HospitalizationAddModalProps {
  open: boolean;
  onClose: () => void;
  onAddHospitalization: (newHospitalization: HospitalizationPost) => void;
}

const HospitalizationAddModal: React.FC<HospitalizationAddModalProps> = ({
  open,
  onClose,
  onAddHospitalization,
}) => {
  const [customers, setCustomers] = useState<UserGet[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [pets, setPets] = useState<PetGet[]>([]);
  const [selectedPet, setSelectedPet] = useState<number>(0);
  //const [vets, setVets] = useState<UserInfo[]>([]);
  const [selectedVet, setSelectedVet] = useState<number>(0);
  const [kennelId, setKennelId] = useState<number>(0);
  const [admissionDate, setAdmissionDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");

  useEffect(() => {
    // Fetch customers when modal opens
    const fetchCustomers = async () => {
      try {
        const res = await customerGetAPI("customer");
        if (res?.data) {
          setCustomers(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch customers", { toastId: "fetchCustomersError", autoClose: false });
      }
    };

    if (open) {
      fetchCustomers();
    }
  }, [open]);

  const handleCustomerChange = async (username: string) => {
    setSelectedCustomer(username);
    // Fetch pets of the selected customer
    try {
      const res = await petsOfCustomerAPI(username);
      if (res?.data) {
        setPets(res.data);
      }
    } catch (error) {
      toast.error(`Failed to fetch pets for customer ${username}`, { toastId: "fetchPetsError", autoClose: false });
    }
  };

  const handleAddHospitalization = () => {
    // Prepare new hospitalization object and pass to parent component
    const newHospitalization: HospitalizationPost = {
      petId: selectedPet,
      kennelId: kennelId,
      vetId: selectedVet,
      admissionDate: admissionDate,
      dischargeDate: dischargeDate,
    };
    onAddHospitalization(newHospitalization);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Hospitalization</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel>Customer</InputLabel>
            <Select
              value={selectedCustomer}
              onChange={(e) => handleCustomerChange(e.target.value as string)}
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Pet</InputLabel>
            <Select
              value={selectedPet}
              onChange={(e) => setSelectedPet(Number(e.target.value))}
            >
              {pets.map((pet) => (
                <MenuItem key={pet.id} value={pet.id}>
                  {pet.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Kennel ID"
              type="text"
              value={kennelId}
              onChange={(e) => setKennelId(Number(e.target.value))}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Vet ID"
              type="text"
              value={selectedVet}
              onChange={(e) => setSelectedVet(Number(e.target.value))}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Admission Date"
              type="date"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Discharge Date"
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddHospitalization} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HospitalizationAddModal;
