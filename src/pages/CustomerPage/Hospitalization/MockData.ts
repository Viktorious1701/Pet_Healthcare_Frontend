// MockData.tsx
export interface PetHealthTrackEntry {
    date: string;
    description: string;
    status: string;
  }
  
  export interface PetHospitalization {
    petName: string;
    status: string;
    admissionDate: string;
    dischargeDate?: string;
    kennel: {
      kennelId: string;
      description: string; // New field
      dailyCost: number;
    };
    healthTrack: PetHealthTrackEntry[];
    totalCost: number;
  }
  
  export const mockData: PetHospitalization[] = [
    {
      petName: "Buddy",
      status: "In Service",
      admissionDate: "2024-06-01",
      dischargeDate: "",
      kennel: {
        kennelId: "K-101",
        description: "Spacious kennel with comfortable bedding",
        dailyCost: 20,
      },
      healthTrack: [
        {
          date: "2024-06-01",
          description: "Admitted for check-up",
          status: "Sick",
        },
      ],
      totalCost: 0,
    },
    {
      petName: "Max",
      status: "Discharged",
      admissionDate: "2024-05-20",
      dischargeDate: "2024-06-02",
      kennel: {
        kennelId: "K-102",
        description: "Kennel with private play area",
        dailyCost: 15,
      },
      healthTrack: [
        {
          date: "2024-05-20",
          description: "Admitted for surgery",
          status: "Sick",
        },
        {
          date: "2024-05-25",
          description: "Recovering well",
          status: "Healthy",
        },
      ],
      totalCost: 15 * 13, // 15 daily cost * 13 days
    },
  ];
  