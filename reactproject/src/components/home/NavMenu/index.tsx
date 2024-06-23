import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import {Badge, Box, IconButton, Menu, Tooltip, Typography} from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FeedIcon from '@mui/icons-material/Feed';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { IPublicMenu } from '../../../common/types/news';
export default function BasicMenu(props:IPublicMenu) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    //const handleClose = () => {
    //    setAnchorEl(null)
    //};
    const handleClose = e => {
        setAnchorEl(null)
        props.setLocation(e.target.innerText)
    }

    return (
        <Box
            sx={{
                display: 'inline-block',
                width: '10%',
                height: '10%',
                bgcolor: '#272727',
            }}
        >
            <Tooltip title="Навигация">
            <IconButton sx={{color:'#00BA78'}}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                <MenuIcon/>
            </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box sx={{
                    margin:-1,
                    color:'#fff',
                    bgcolor: '#272727',
                }}>
                    <MenuItem onClick={handleClose} data-my-value={0} sx={{pl:5,pt:2, pr:10,'&:hover': {color: '#00BA78'}}}>
                        <FeedIcon/>
                        <Typography sx={{ml:'5%'}} variant="subtitle1">Новости</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} data-my-value={1} sx={{pl:5,pt:2, pr:10,'&:hover': {color: '#00BA78'}}}>
                        <ShowChartIcon/>
                        <Typography sx={{ml:'5%'}} variant="subtitle1">Биржа заказов</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} data-my-value={2} sx={{pl:5,pt:2, pr:10,'&:hover': {color: '#00BA78'}}}>
                        <FavoriteBorderIcon/>
                        <Typography sx={{ml:'5%'}} variant="subtitle1">Мои заказы</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} data-my-value={3} sx={{pl:5,pt:2, pr:10,'&:hover': {color: '#00BA78'}}}>
                        <Badge badgeContent={4} color="success">
                            <MailOutlineIcon/>
                        </Badge>
                        <Typography sx={{ml:'5%'}} variant="subtitle1">Сообщения</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} data-my-value={4} sx={{pl:5,pt:2, pr:10, pb:2,'&:hover': {color: '#00BA78'}}}>
                        <PermIdentityIcon/>
                        <Typography sx={{ml:'5%'}} variant="subtitle1">Профиль</Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    );
}