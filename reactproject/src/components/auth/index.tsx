import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import {Box} from "@mui/material";
import {instance} from "../../utils/axios";
import {useAppDispatch} from "../../utils/hook";
//import {login} from "../../store/slice/auth";
import {AppErrors} from "../../common/types/errors";
import { loginUser } from '../../utils/store/thunks/auth';
import Alert from '@mui/material/Alert';
import ReactDOM from "react-dom";
const AuthRootComponent:React.FC = ():JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e:{preventDefault:() => void;})=>{
        e.preventDefault()
        if (location.pathname === '/login'){
            try {
                const userData = {
                    email: email,
                    password: password,
                }
                //   const response = await instance.post('/Authenticate',userData)
                await dispatch(loginUser(userData))//   await dispatch(login(response.data))
                if (sessionStorage.getItem('userToken') == null)
                    navigate('/login')
                navigate('/')
            } catch (e) {
                ReactDOM.render(<Alert severity="error">This is an error Alert.</Alert>, document.getElementById("root"))
                return (e as Error).message;
            }
        } else{
            if (password === repeatPassword){
                const userData = {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastname,
                }
                const response = await instance.post('/Registrate',userData)
                navigate('/login')
                console.log(response.data)} else{
                ReactDOM.render(<Alert severity="error">This is an error Alert.</Alert>, document.getElementById("root"))
                throw new Error(AppErrors.passwordDoNotMatch)
            }
        }
    }


    return(
        <div className={'root'}>
            <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                <Box

                    sx={{
                        backgroundColor: 'transparent', height: '100%', width: '100%', margin: 0, verticalAlign: 'center' ,display: 'flex',alignItems: 'center',justifyContent: 'center', mt:5}}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'>
                    {
                        location.pathname === '/login' ? <LoginPage setEmail = {setEmail} setPassword = {setPassword} navigate={navigate}/>
                            : location.pathname === '/register' ? <RegisterPage setEmail = {setEmail} setPassword = {setPassword} setRepeatPassword = {setRepeatPassword} setFirstName = {setFirstName} setLastName = {setLastName} navigate={navigate}/>
                                : null}
                </Box>
            </form>
        </div>
    );
};

export default AuthRootComponent;