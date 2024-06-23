import React from 'react';
import {IPropsRegister} from "../../../common/types/auth/auth";
import {Box, Button, TextField, Typography} from "@mui/material";

const RegisterPage:React.FC<IPropsRegister> = (props: IPropsRegister): JSX.Element =>{
    const inputStyle = { WebkitBoxShadow: "0 0 0 1000px transparent inset" };

    const{setPassword, setEmail, setRepeatPassword, setLastName, setFirstName, navigate} = props
    return(
        <Box   sx={{backgroundColor:'#27272780'}}
               display='flex'
               justifyContent='center'
               alignItems='center'
               flexDirection='column'
               maxWidth={740}
               margin='auto'
               border={1}
               borderColor='#ffffff90'
               padding={5}
               borderRadius={5}>
            <Typography color="#ffffff" variant="h3" textAlign="center">Регистрация</Typography>
            <Typography color="#ffffff80" variant="body1" marginBottom={3} textAlign="center">Введите данные для регистрации</Typography>
            <TextField color="success" autoComplete='off'  sx={{ input: { placeholderColor:'#ffffff80', color: 'white' } }} type="email" margin="normal" fullWidth={true}  label="Email" variant="outlined" placeholder="Введите ваш email" onChange={(e) => setEmail(e.target.value)} inputProps={{ style: inputStyle }}/>
            <TextField color="success" autoComplete='off'  sx={{ input: {placeholderColor:'#ffffff80', color: 'white' } }} margin="normal" fullWidth={true} label="Имя" variant="outlined" placeholder="Введите ваше имя" onChange={(e) => setFirstName(e.target.value)} inputProps={{ style: inputStyle }}/>
            <TextField color="success" autoComplete='off' sx={{ input: {placeholderColor:'#ffffff80', color: 'white' } }} margin="normal" fullWidth={true} label="Фамилия" variant="outlined" placeholder="Введите вашу фамилию" onChange={(e) => setLastName(e.target.value)} inputProps={{ style: inputStyle }}/>
            <TextField color="success" autoComplete='off' sx={{ input: {placeholderColor:'#ffffff80', color: 'white' } }} type="password" margin="normal" fullWidth={true} label="Пароль" variant="outlined" placeholder="Введите ваш пароль" onChange={(e) => setPassword(e.target.value)} inputProps={{ style: inputStyle }}/>
            <TextField color="success" autoComplete='off' sx={{ input: {placeholderColor:'#ffffff80', color: 'white' } }} type="password" margin="normal" fullWidth={true} label="Повторите пароль" variant="outlined" placeholder="Повторите ваш пароль" onChange={(e) => setRepeatPassword(e.target.value)} inputProps={{ style: inputStyle }}/>
            <Button type="submit" variant="contained" sx={{backgroundColor:" #6FCF9780",'&:hover': {bgcolor: '#6FCF97',},border:"6FCF97", marginBottom: 2, marginTop: 2, width:'60%'}}>Регистрация</Button>
        </Box>

    )
};

export default RegisterPage;