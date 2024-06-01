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

const generateRandomSlots = () => {
  const allSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:30 PM'];
  const availableSlots = allSlots.filter(() => Math.random() > 0.5);
  return availableSlots.length ? availableSlots : [allSlots[Math.floor(Math.random() * allSlots.length)]];
};

const fetchDoctors = (date: Date | null, slot: string | null): Doctor[] => {
  if (!date || !slot) {
    return []; // Return an empty array if date or slot is falsy
  }

  console.log("Selected date:", date); // This will print the date object
  const dateString = formatISO(date, { representation: 'date' });

  // Simulate a list of doctors
  const doctorsData: Doctor[] = [
    { id: 1, name: 'Dr. Smith', availability: [] },
    { id: 2, name: 'Dr. Johnson', availability: [] },
    { id: 3, name: 'Dr. Williams', availability: [] },
    { id: 4, name: 'Dr. Brown', availability: [] },
    { id: 5, name: 'Dr. Jones', availability: [] },
  ];

  // Add random availability to each doctor
  doctorsData.forEach(doctor => {
    doctor.availability.push({ date: dateString, slots: generateRandomSlots() });
  });

  // Filter doctors based on the chosen slot
  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.availability.some((availability) =>
      availability.date === dateString && availability.slots.includes(slot)
    )
  );

  return filteredDoctors;
};

export default fetchDoctors;
