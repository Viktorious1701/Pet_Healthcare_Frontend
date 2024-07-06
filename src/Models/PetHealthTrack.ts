/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PetHealthTrack {
  date: any
  petHealthTrackId: number
  petName: string
  petImage: string
  hospitalizationId: number
  description: string
  dateOnly: string
  status: number
}

export enum PetStatus {
  Severe = 'Severe',
  Recovering = 'Recovering',
  Normal = 'Normal',
  Good = 'Good'
}

// Function to get the display string for a given PetStatus
