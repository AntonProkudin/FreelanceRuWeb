import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { IPublicMyOrders } from "../../../../../common/types/orders";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MessageIcon from '@mui/icons-material/Message';
import { useState } from "react";
import { IPublicUser } from "../../../../../common/types/auth/auth";
import { useAuthInstance } from "../../../../../utils/axios";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
export function StockItem(orders: IPublicMyOrders) {


    const [openInfo, setOpenInfo] = useState(false);
    const [info, setInfo] = useState<IPublicUser>()
    const api = useAuthInstance()
    const handleInfo = async () => {
        try {
            const response = await api.get(`/api/Users/UserInfo/${orders.userId}`)
            setInfo(response.data);
            setOpenInfo(true)
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }
        
    }

    return (
        <Box sx={{ width: '80%', height: '100%', bgcolor: '#272727', mt: 6, }}
            borderRadius={5}>
            <Card sx={{ maxWidth: '100%', bgcolor: '#272727' }}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings" sx={{ color: '#00BA78' }} >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={orders.title}
                    subheader={`${orders.ts}`}
                />
                <CardContent>
                    <Typography variant="body2" color="#F8F6F0">{orders.description}</Typography>
                    <Stack direction="row" sx={{mt:2} }>
                        <Typography sx={{ color: "#00BA78"}}>Категория: </Typography>
                        <Typography sx={{ color: "#fff", ml: 1 }}>{orders.category}</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography sx={{ color: "#00BA78"}}>Прайс: </Typography>
                        <Typography sx={{ color: "#fff", ml: 1 }}>{orders.price}₽</Typography>
                    </Stack>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleInfo} aria-label="add to favorites">
                        <PersonOutlineIcon  sx={{ color: '#00BA78' }} />
                    </IconButton>
                    <IconButton sx={{ color: '#00BA78' }} aria-label="share">
                        <MessageIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
                <DialogTitle>
                    Информация об аккаунте
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: '100%', height: '100%', bgcolor: '#272727', mt: 6, }}
                        borderRadius={5}>
                        <Card sx={{ maxWidth: '100%', bgcolor: '#272727' }}>
                            <br />
                            <CardMedia
                                sx={{ objectFit: 'contain', maxHeight: 500 }}
                                component="img"
                                image={info?.avatar} />

                            <CardContent>
                                <SimpleTreeView>
                                    <TreeItem itemId="grid" label="Информация об аккаунте">
                                        <TreeItem itemId="grid-community" label={`Имя: ${info?.firstName}`} />
                                        <TreeItem itemId="grid-community2" label={`Фамилия: ${info?.lastName}`} />
                                        <TreeItem itemId="grid-community3" label={`Почта: ${info?.email}`} />
                                    </TreeItem>
                                    <TreeItem itemId="pickers" label="Навыки">
                                        {info?.userSkills.map((skill) => (
                                            <TreeItem itemId={skill.title} label={`${skill.title}`} />
                                        ))}
                                    </TreeItem>
                                </SimpleTreeView>
                            </CardContent>
                            <CardActions disableSpacing>
                            </CardActions>
                        </Card>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}