import React, { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { UserInfo } from '@/Models/User' // Ensure this import path is correct
import { customerGetAPI } from '@/Services/UserService'

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

interface VetSelectionProps {
  selectedVet: string
  onChange: (username: string) => void
}

const VetSelection: React.FC<VetSelectionProps> = ({ selectedVet, onChange }) => {
  const [vets, setVets] = useState<UserInfo[]>([])

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await customerGetAPI('vet')
        const data = response?.data
        console.log('Fetched vets:', data) // Debugging log
        if (Array.isArray(data)) {
          setVets(data)
        } else {
          console.error('Fetched data is not an array:', data)
          setVets([])
        }
      } catch (error) {
        console.error('Failed to fetch vets:', error)
        setVets([])
      }
    }

    fetchVets()
  }, [])
  // check the vets array
  useEffect(() => {
    console.log('Vets state:', vets)
  }, [vets])
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Vet</InputLabel>
      <Select value={selectedVet} onChange={handleChange} input={<OutlinedInput label='Vet' />} MenuProps={MenuProps}>
        {vets.length === 0 ? (
          <MenuItem disabled>No vets available</MenuItem>
        ) : (
          vets.map((vet) => (
            <MenuItem key={vet.userId} value={vet.userName}>
              {vet.firstName} {vet.lastName} ({vet.userName})
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export default VetSelection
