export type PetGet = {
    id: number,
    customerId: string,
    name: string,
    species: string,
    breed: string,
    gender: boolean,
    weight: number,
    imageUrl: string,
    imageFile: File | null
};