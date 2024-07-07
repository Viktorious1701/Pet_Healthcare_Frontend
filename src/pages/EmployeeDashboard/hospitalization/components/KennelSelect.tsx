import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Kennel } from '@/Models/Kennel'; // Ensure this import path is correct
import { kennelGetAPI } from '@/Services/KennelService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

interface KennelSelectionProps {
  selectedKennel: string;
  onChange: (kennelId: string) => void;
}

const KennelSelection: React.FC<KennelSelectionProps> = ({ selectedKennel, onChange }) => {
  const [kennels, setKennels] = useState<Kennel[]>([]);

  useEffect(() => {
    const fetchKennels = async () => {
      try {
        const response = await kennelGetAPI();
        const data = response?.data;
        console.log('Fetched kennels:', data); // Debugging log
        if (data && Array.isArray(data)) {
          setKennels(data);
        } else {
          console.error('Fetched data is not an array or is null:', data);
          setKennels([]);
        }
      } catch (error) {
        console.error('Failed to fetch kennels:', error);
        setKennels([]);
      }
    };

    fetchKennels();
  }, []);

  // Check the kennels array
  useEffect(() => {
    console.log('Kennels state:', kennels);
  }, [kennels]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Kennel</InputLabel>
      <Select
        value={selectedKennel}
        onChange={handleChange}
        input={<OutlinedInput label='Kennel' />}
        MenuProps={MenuProps}
      >
        {kennels.length === 0 ? (
          <MenuItem disabled>No kennels available</MenuItem>
        ) : (
          kennels.map((kennel) => (
            <MenuItem key={kennel.kennelId} value={kennel.kennelId.toString()}>
              {kennel.description} (ID: {kennel.kennelId})
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default KennelSelection;
