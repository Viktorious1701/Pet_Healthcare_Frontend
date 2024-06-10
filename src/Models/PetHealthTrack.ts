export interface PetHealthTrack {
  petHealthTrackId: number;
  hospitalizationId?: number;
  description?: string;
  date?: Date;
  status?: PetStatus;
}

export enum PetStatus {
  Healthy = "Healthy",
  Sick = "Sick",
  Injured = "Injured",
}

// Function to get the display string for a given PetStatus
