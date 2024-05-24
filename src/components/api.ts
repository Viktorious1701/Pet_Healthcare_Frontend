import doctorsData from './doctors.json';
import { formatISO } from 'date-fns';

interface Availability {
  date: string;
  slots: string[];
}

interface Doctor {
  id: number;
  name: string;
  availability: Availability[];
}

const fetchDoctors = (date: Date | null, slot: string | null): Doctor[] => {
  if (!date || !slot) {
    return []; // Return an empty array if date or slot is falsy
  }

  console.log("date u click", date); // This will print the date object
  const dateString = formatISO(date, { representation: 'date' });
  // Filter doctors based on date and slot
  const filteredDoctors = doctorsData.doctors.filter((doctor) => {
    return doctor.availability.some((availability) => {
      const availabilityDateString = formatISO(new Date(availability.date), { representation: 'date' });
      return availabilityDateString === dateString && availability.slots.includes(slot);
    });
  });

  return filteredDoctors;
};

export default fetchDoctors;