export interface IPropsLogin{
    setPassword:(value:string)=> void
    setEmail:(value:string)=>void
    navigate:(to:string)=>void
}
export interface IPropsRegister{
    setPassword:(value:string)=> void
    setEmail:(value:string)=>void
    setLastName:(value:string)=> void
    setRepeatPassword:(value:string)=>void
    setFirstName:(value:string)=> void
    navigate:(to:string)=> void
}
export interface IAuthState{
    user: IPublicUser|null,
    isLogged: boolean,
}
export interface IPublicUser {
    email: string
    userToken: string|null
    id:number|null
    firstName: string
    lastName: string
    avatar: string
    active: boolean
    userSkills: userSkills[]
}
export interface userSkills {
    id: number
    title: string
}
export interface ILoginData{
    password:string
    email:string
}
export interface IRegisterData{
    password:string
    email:string
    firstName: string
    lastName: string
}