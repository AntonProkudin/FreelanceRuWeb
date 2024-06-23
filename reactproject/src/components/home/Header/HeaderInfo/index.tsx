import {Box, IconButton, InputBase, Stack, Tooltip} from '@mui/material';
import {Fingerprint,Input, Search} from "@mui/icons-material";
import BasicMenu from "../../NavMenu";
import {useNavigate} from "react-router-dom";
import { IPublicMenu } from '../../../../common/types/news';
export function HeaderInfo(props: IPublicMenu){
    const navigate = useNavigate()
    return (
        <Stack direction="row" sx={{ bgcolor: '#272727' }}>
            <BasicMenu setLocation={props.setLocation}></BasicMenu>
            <Box sx={{display: 'inline-block',width: '100%',height: '10%',bgcolor: '#272727',}}>
                <Tooltip title="Авторизация">
                    <IconButton aria-label="fingerprint" sx={{color:'#00BA78', float:'right'}} onClick={()=>navigate("/register")}>
                        <Input />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Регистрация">
                    <IconButton aria-label="fingerprint" sx={{color:'#00BA78', float:'right'}} onClick={()=>navigate("/login")}>
                        <Fingerprint />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Поиск">
                    <IconButton type="button" sx={{mr:'20%',color:'#00BA78', float:'right'}} aria-label="search">
                        <Search/>
                    </IconButton>
                </Tooltip>
                <InputBase
                    sx={{ flex: 1, color: "white", float:'right'}}
                    placeholder="Поиск"
                    inputProps={{ 'aria-label': 'search' }}/>


            </Box>
        </Stack>

  );
}