export type SlotPost = {
    startTime: string,
    endTime: string
};

export type SlotGet = {
    available: boolean;
    slotId: number,
    startTime: string,
    endTime: string
};