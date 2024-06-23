/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginData, IRegisterData} from "../../../../common/types/auth/auth";
import { instance, useAuthInstanceWithBearer } from "../../../axios";

export const loginUser = createAsyncThunk(
    '/Authenticate',
    async (data:ILoginData, {rejectWithValue},) => {
        try {
            
            const tokenresponse = await instance.post('/api/Users/Login/', data)
            sessionStorage.setItem('accessToken', tokenresponse.data.accessToken)
            sessionStorage.setItem('refreshToken', tokenresponse.data.refreshToken)
            const api = useAuthInstanceWithBearer(tokenresponse.data.accessToken)
            const response = await api.get('/api/Users/UserInfo')
            console.log(response.data)
            sessionStorage.setItem('userInfo', JSON.stringify(response.data))
            //sessionStorage.setItem('email',response.data.email)
            //sessionStorage.setItem('id',response.data.id)
            //sessionStorage.setItem('lastName',response.data.lastName)
            //sessionStorage.setItem('role',response.data.role)
            return response.data
        }catch (error:any) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            } else{
                return rejectWithValue(error.message)
            }
        }
    }
)
export const RegisterUser = createAsyncThunk(
    '/Registrate',
    async (data:IRegisterData, {rejectWithValue},) => {
        try{
            const response = await instance.post('/Registrate',data)
            return response.data
        }catch (error:any) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            } else{
                return rejectWithValue(error.message)
            }
        }
    }
)