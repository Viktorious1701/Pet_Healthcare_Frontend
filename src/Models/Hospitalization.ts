export type Hospitalization = {
    hospitalizationId : number,
    petId: number,
    kennelId: number,
    vetId: number,
    admissionDate: string,
    dischargeDate: string,
    petName?: string;  // Optional because it will be fetched later
}
export type HospitalizationPost = {
    petId: number,
    kennelId: number,
    vetId: number,
    admissionDate: string,
    dischargeDate: string,
}