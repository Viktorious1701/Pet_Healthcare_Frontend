import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, TextField } from '@mui/material';
import { HospitalizationPost } from '@/Models/Hospitalization'; // Adjust import path as per your structure
import CustomerSelection from './CustomerSelection';
import PetSelection from './PetSelection';
import VetSelection from './VetSelection';
import KennelSelection from './KennelSelect';

interface HospitalizationAddModalProps {
  open: boolean;
  onClose: () => void;
  onAddHospitalization: (newHospitalization: HospitalizationPost) => void;
}

const HospitalizationAddModal: React.FC<HospitalizationAddModalProps> = ({ open, onClose, onAddHospitalization }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedPet, setSelectedPet] = useState<string>('');
  const [selectedVet, setSelectedVet] = useState<string>('');
  const [selectedKennel, setSelectedKennel] = useState<string>('');
  const [admissionDate, setAdmissionDate] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');

  const handleCustomerChange = (username: string) => {
    setSelectedCustomer(username);
    setSelectedPet(''); // Reset pet selection when customer changes
  };

  const handlePetChange = (petId: string) => {
    setSelectedPet(petId);
  };

  const handleVetChange = (username: string) => {
    setSelectedVet(username);
  };

  const handleKennelChange = (kennelId: string) => {
    setSelectedKennel(kennelId);
  };

  const handleAddHospitalization = () => {
    // Prepare new hospitalization object and pass to parent component
    const newHospitalization: HospitalizationPost = {
      petId: selectedPet,
      kennelId: selectedKennel,
      vetId: selectedVet,
      admissionDate: admissionDate,
      dischargeDate: dischargeDate
    };
    onAddHospitalization(newHospitalization);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Add New Hospitalization</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormControl fullWidth>
            <CustomerSelection selectedCustomer={selectedCustomer} onChange={handleCustomerChange} />
          </FormControl>
          <FormControl fullWidth>
            <PetSelection selectedCustomer={selectedCustomer} selectedPet={selectedPet} onChange={handlePetChange} />
          </FormControl>
          <FormControl fullWidth>
            <KennelSelection selectedKennel={selectedKennel} onChange={handleKennelChange} />
          </FormControl>
          <FormControl fullWidth>
            <VetSelection selectedVet={selectedVet} onChange={handleVetChange} />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label='Admission Date'
              type='date'
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label='Discharge Date'
              type='date'
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleAddHospitalization} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HospitalizationAddModal;
