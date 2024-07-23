import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postPetHealthTrack } from '@/Services/PetHealthTrackService';
import { toast } from 'sonner';

// Assuming postPetHealthTrack is an async function that posts the data to a server
// import { postPetHealthTrack } from 'path_to_your_service';
enum PetStatus {
  Severe = 0,
  Recovering = 1,
  Normal = 2,
  Good = 3
}

const PetHealthTrackForm = ({ hospitalizationId }: { hospitalizationId: number }) => {
  // Accept hospitalizationId as a prop of type number
  const [petHealthTrackDetails, setPetHealthTrackDetails] = useState({
    hospitalizationId: hospitalizationId,
    description: '',
    date: '',
    status: 2 // Default to Normal (2)
  });

  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility

  // Your existing or additional TypeScript code would go here.
  // You can now use the PetStatus enum throughout this file.

  // Specify the type of element the ref is for. If `Input` renders an input element, use HTMLInputElement.
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        descriptionInputRef.current?.focus();
      }, 1); // Adjust the delay as needed
    }
  }, [isOpen]);

  useEffect(() => {
    setPetHealthTrackDetails((prevDetails) => ({
      ...prevDetails,
      hospitalizationId: hospitalizationId
    }));
  }, [hospitalizationId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setPetHealthTrackDetails((prevState) => ({
      ...prevState,
      [id]: id === 'status' ? Number(value) : value
    }));
  };

  const handleAddPetHealthTrack = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!petHealthTrackDetails.description || !petHealthTrackDetails.date) {
      toast.warning('Please fill in all required fields', {});
      return;
    }
    const result = await postPetHealthTrack({
      petHealthTrackId: 0,
      petName: '',
      petImage: '',
      dateOnly: '',
      ...petHealthTrackDetails
    });
    if (result) {
      toast.success('Pet Health Track added successfully', {});
      setIsOpen(false); // Close the dialog
      setPetHealthTrackDetails({
        hospitalizationId: hospitalizationId,
        description: '',
        date: '',
        status: 2 // Reset to Normal (2)
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setIsOpen(true)}>
          Add Pet Health Track
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Pet Health Track</DialogTitle>
          <DialogDescription>Fill in the details below to add a new pet health track.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddPetHealthTrack} className='grid gap-4 py-4'>
          {/* Input fields updated to use petHealthTrackDetails and handleInputChange */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='hospitalizationId' className='text-right'>
              Hospitalization ID
            </Label>
            <Input
              id='hospitalizationId'
              type='number'
              readOnly
              value={petHealthTrackDetails.hospitalizationId}
              onChange={handleInputChange}
              className='col-span-3 bg-gray-200'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Input
              id='description'
              ref={descriptionInputRef} // Attach the ref to the description input
              value={petHealthTrackDetails.description}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='date' className='text-right'>
              Date
            </Label>
            <Input
              id='date'
              type='date'
              value={petHealthTrackDetails.date}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='status' className='text-right'>
              Status
            </Label>
            <select
              id='status'
              value={petHealthTrackDetails.status}
              onChange={handleInputChange}
              className='col-span-3 form-select'
            >
              {Object.entries(PetStatus).map(
                ([key, value]) =>
                  typeof value === 'number' && (
                    <option key={value} value={value}>
                      {key}
                    </option>
                  )
              )}
            </select>
          </div>
          <DialogFooter>
            <Button type='submit' className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'>
              Add Health Track
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PetHealthTrackForm;
