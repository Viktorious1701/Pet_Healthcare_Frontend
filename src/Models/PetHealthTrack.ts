export interface PetHealthTrack {
  petHealthTrackId: number;
  petName: string;
  petImage: string;
  hospitalizationId: number;
  description: string;
  dateOnly: string;
  status: number;
}

export enum PetStatus {
  Severe = "Severe",
  Recovering = "Recovering",
  Normal = "Normal",
  Good = "Good"
}

// Function to get the display string for a given PetStatus
