import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddPetHealthTrack = () => {
  const [hospitalizationId, setHospitalizationId] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(0);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log({ hospitalizationId, description, date, status });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Pet Health Track</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Pet Health Track</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new pet health track.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hospitalizationId" className="text-right">
              Hospitalization ID
            </Label>
            <Input
              id="hospitalizationId"
              type="number"
              value={hospitalizationId}
              onChange={(e) => setHospitalizationId(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              type="number"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button
            type="submit"
              className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'
            >
              Add Health Track
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPetHealthTrack;