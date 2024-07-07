export type SlotPost = {
  startTime: string;
  endTime: string;
};

export type SlotGet = {
  slotId: number;
  startTime: string;
  endTime: string;
  duration: string;
  available: boolean;
};
