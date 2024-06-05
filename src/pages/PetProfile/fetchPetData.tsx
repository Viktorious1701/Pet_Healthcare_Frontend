// Mock data for demonstration
export interface Pet {
    name: string;
    species: string;
    breed: string;
    image: string;
  }
const mockPetData: Record<string, Pet> = {
    '1': {
      name: 'Bella',
      species: 'Dog',
      breed: 'Labrador Retriever',
      image: 'https://placehold.co/600x400',
    },
    '2': {
      name: 'Max',
      species: 'Cat',
      breed: 'Siamese',
      image: 'https://placehold.co/600x400',
    },
    // Add more mock data as needed
  };
  
  const fetchPetData = (petId: string): Promise<Pet | null> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const petData = mockPetData[petId];
        if (petData) {
          resolve(petData);
        } else {
          reject(new Error(`Pet with ID ${petId} not found`));
        }
      }, 500); // Simulating an async operation with a 500ms delay
    });
  };
  
  export default fetchPetData;