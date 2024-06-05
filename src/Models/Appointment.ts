export type AppointmentAvailableVets = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    imageURL: string
}

export type AppointmentRating = {
    appointmentId: number,
    rating: number,
    comment: string
}

export type AppointmentBook = {
    customerUserName: string,
    petId: number,
    vetUserName: string,
    slotId: number,
    serviceId: number,
    date: string
}

export type AppointmentGet = {
    appointmentId: number,
    customer: string,
    pet: string,
    vet: string,
    slotStartTime: number,
    slotEndTime: number,
    service: string,
    date: string,
    totalCost: number,
    cancellationDate: string,
    refundAmount: number,
    rating: number,
    comment: string,
    status: string
}

export enum AppointmentStatus {
    Booked = 0,
    Processing = 1,
    Done = 2,
    Cancelled = 3
}