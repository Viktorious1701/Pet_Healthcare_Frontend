export type Hospitalization = {
    hospitalizationId : number,
    petId: number,
    kennelId: number,
    vetId: number,
    admissionDate: string,
    dischargeDate: string,
    petName?: string;  // Optional because it will be fetched later
    totalCost: number;
    paymentStatus: number;
}
export type HospitalizationPost = {
    petId: string,
    kennelId: string,
    vetId: string,
    admissionDate: string,
    dischargeDate: string,
}