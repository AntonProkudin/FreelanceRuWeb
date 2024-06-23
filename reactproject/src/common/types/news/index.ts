export interface NewsItems {
    id: number,
    title: string,
    description:string,
    url: string,
    ts: Date,
}
export interface IPublicMenu {
    setLocation: (value: string) => void
}
export interface IPublicActiveMenu {
    location: string,
}