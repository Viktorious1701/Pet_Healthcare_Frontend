import React from 'react'
import { Select, SelectItem, Avatar } from '@nextui-org/react'
import { PetGet } from '@/Models/Pet'

interface BookingPetProps {
  pets: PetGet[]
  onSelectPet: (petId: string) => void
}

const BookingPet: React.FC<BookingPetProps> = ({ pets, onSelectPet }) => {
  const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPetIdFromEvent = event.target.value
    onSelectPet(selectedPetIdFromEvent)
  }
  return (
    <Select
      items={pets}
      label='Choose a pet'
      className='max-w-md'
      variant='bordered'
      classNames={{
        label: 'group-data-[filled=true]:-translate-y-5',
        trigger: 'min-h-16',
        listboxWrapper: 'max-h-[400px]'
      }}
      listboxProps={{
        itemClasses: {
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500'
          ]
        }
      }}
      popoverProps={{
        classNames: {
          base: 'before:bg-default-200',
          content: 'p-0 border-small border-divider'
        }
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className='flex items-center gap-2'>
            <Avatar alt={item.data?.name} className='flex-shrink-0' size='sm' src={item.data?.imageUrl} />
            <div className='flex flex-col'>
              <span className='text-small'>{item.data?.name}</span>
              <span className='text-default-500 text-tiny'>({item.data?.species})</span>
            </div>
          </div>
        ))
      }}
      onChange={handlePetChange}
    >
      {(pet) => (
        <SelectItem key={pet.id} value={pet.id} textValue={pet.name}>
          <div className='flex gap-2 items-center'>
            <Avatar alt={pet.name} className='flex-shrink-0' size='sm' src={pet.imageUrl} />
            <div className='flex flex-col'>
              <span className='text-small'>{pet.name}</span>
              <span className='text-tiny text-default-400'>{pet.breed}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}

export default BookingPet
