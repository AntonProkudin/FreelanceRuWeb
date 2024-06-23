import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {IPropsLogin} from "../../../common/types/auth/auth";

const LoginPage:React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element =>{
    const{setPassword, setEmail, navigate} = props
    return(
        <Box   sx={{backgroundColor:'#27272780'}}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            maxWidth={740}
            margin='auto'
            padding={5}
            border={1}
               borderColor='#ffffff90'
            borderRadius={5}>
            <Typography  variant="h3" color="#ffffff" textAlign="center">Авторизация</Typography>
            <Typography  variant="body1" color="#ffffff90" marginBottom={3} textAlign="center">Введите ваш логин и пароль</Typography>
            <TextField autoComplete='off' sx={{ input: { color: '#ffffff' }}} type="email" margin="normal" fullWidth={true}  label="Email" variant="filled"  color="success" placeholder="Введите ваш email" onChange={(e) => setEmail(e.target.value)} inputProps={{ autoComplete: 'off', form: {autoComplete: 'off',},}}/>
            <TextField autoComplete='off' sx={{ input: { color: '#ffffff' }}} type="password" margin="normal" fullWidth={true} label="Пароль" variant="filled" color="success" placeholder="Введите ваш пароль" onChange={(e) => setPassword(e.target.value)} inputProps={{ autoComplete: 'off', form: {autoComplete: 'off',},}}/>
            <Button      type="submit" variant="contained" sx={{backgroundColor:" #6FCF9780",'&:hover': {bgcolor: '#6FCF97',},border:"6FCF97", marginBottom: 2, marginTop: 2, width:'60%'}}>Войти</Button>
        </Box>
    )
}

export default LoginPage;