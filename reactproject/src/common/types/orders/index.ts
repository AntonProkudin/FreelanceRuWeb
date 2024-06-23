export interface IPublicMyOrders {
    userId:number
    id: number,
    title: string,
    description: string,
    category:string,
    price: string,
    isCompleted: boolean
    ts: Date,
    IsClick: (value: string) => void
}