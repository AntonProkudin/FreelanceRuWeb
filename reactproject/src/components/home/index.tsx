import React, {useState } from 'react';
import './style.scss'
import {HeaderInfo} from "./Header/HeaderInfo";
import {Box} from "@mui/material";
import {Window} from "./Window";
const Home: React.FC = (): JSX.Element => {
    const [locate, setLocate] = useState("Новости");
    return(
        <div>
            <HeaderInfo setLocation={setLocate}></HeaderInfo>
            <Box sx={{justifyContent:'center', alignItems:'center', display:'center',}}>
                <Window location={locate} />
            </Box>

        </div>

    )
}

export default Home;
