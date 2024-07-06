import React, { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { petsOfCustomerAPI } from '@/Services/PetService'
import { PetGet } from '@/Models/Pet'
import { toast } from 'sonner'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface PetSelectionProps {
  selectedCustomer: string
  selectedPet: string
  onChange: (petId: string) => void
}

const PetSelection: React.FC<PetSelectionProps> = ({ selectedCustomer, selectedPet, onChange }) => {
  const [pets, setPets] = useState<PetGet[]>([])

  useEffect(() => {
    const fetchPets = async () => {
      if (selectedCustomer) {
        try {
          const response = await petsOfCustomerAPI(selectedCustomer)
          const petList = response?.data
          if (petList && Array.isArray(petList)) {
            setPets(petList)
          } else {
            setPets([])
          }
        } catch (error) {
          toast.error('Failed to fetch pets')
        }
      }
    }
    fetchPets()
  }, [selectedCustomer])

  useEffect(() => {
    console.log('Pets state:', pets)
  }, [pets])

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Pet</InputLabel>
      <Select value={selectedPet} onChange={handleChange} input={<OutlinedInput label='Pet' />} MenuProps={MenuProps}>
        {pets.length === 0 ? (
          <MenuItem disabled>No pets available</MenuItem>
        ) : (
          pets.map((pet) => (
            <MenuItem key={pet.id} value={pet.id}>
              {pet.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export default PetSelection
