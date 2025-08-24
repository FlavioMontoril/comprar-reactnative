export enum FilterStatus {
    PENDING = "pending",
    DONE = "done",
}
export interface ProductProps{
    id: string,
    status: FilterStatus,
    description: string,
}