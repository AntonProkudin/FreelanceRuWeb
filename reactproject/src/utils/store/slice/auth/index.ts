import {createSlice} from "@reduxjs/toolkit";
import {loginUser} from "../../thunks/auth";
import { IAuthState } from "../../../../common/types/auth/auth";


const initialState: IAuthState = {
    user: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
    //{
    //    email: sessionStorage.getItem('email')||'',
    //    userToken:sessionStorage.getItem('userToken')|| '',
    //    id: Number(sessionStorage.getItem('id'))||null,
    //    firstName:sessionStorage.getItem('firstName')|| '',
    //    lastName:sessionStorage.getItem('lastName')|| '',
    //    avatar: sessionStorage.getItem('avatar') || false,
    //    active: 
    //},
    isLogged: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
//        login(state, action){
//            state.user = action.payload
//
//           state.isLogged = true
        // console.log('Action',action.payload)
        // console.log('User from state', state.user )
        // console.log('Login is ', state.isLogged)
//        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled, (state, action)=>{
            state.user = action.payload
            state.isLogged = true
        })
        builder.addCase(loginUser.pending, (state, action)=>{
            state.isLogged = false
        })
        builder.addCase(loginUser.rejected, (state, action)=>{
            state.isLogged = false
        })
    }
})
//export const {login} = authSlice.actions
export default authSlice.reducer