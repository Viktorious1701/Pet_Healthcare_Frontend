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

interface CustomerSelectionProps {
  selectedCustomer: string
  onChange: (username: string) => void
}

const CustomerSelection: React.FC<CustomerSelectionProps> = ({ selectedCustomer, onChange }) => {
  const [users, setUsers] = useState<UserInfo[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customerGetAPI('customer')
        const data = response?.data
        if (data && Array.isArray(data)) {
          setUsers(data)
        } else {
          console.error('Fetched data is not an array or is null:', data)
          setUsers([])
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
        setUsers([])
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    console.log('Users state:', users)
  }, [users])

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Customer</InputLabel>
      <Select
        value={selectedCustomer}
        onChange={handleChange}
        input={<OutlinedInput label='Customer' />}
        MenuProps={MenuProps}
      >
        {users.length === 0 ? (
          <MenuItem disabled>No users available</MenuItem>
        ) : (
          users.map((user) => (
            <MenuItem key={user.userId} value={user.userName}>
              {user.firstName} {user.lastName} ({user.userName})
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export default CustomerSelection
