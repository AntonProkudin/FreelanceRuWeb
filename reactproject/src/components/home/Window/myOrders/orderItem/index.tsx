import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { IPublicMyOrders } from "../../../../../common/types/orders";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { useAuthInstance } from "../../../../../utils/axios";
export function MyOrdersItemItem(orders: IPublicMyOrders) {
    const api = useAuthInstance()
    const handleDelete = async () => {
        try {
            const response = await api.delete(`/api/Tasks/${orders.id}`)
            var element = document.getElementById(orders.id);
            element.style.display = 'none'
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }

    }
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const clickCreate = async () => {
        try {
            var time = new Date();
            var description = document.getElementById(orders.id + "description");
            var price = document.getElementById(orders.id + "price");
            var title = document.getElementById(orders.id + "title");
            const recordData = {
                categoryId: 1,
                price: price.value,
                description: description.value,
                title: title.value,
                isCompleted: true,
                ts: time,
            }
            await api.post(`/api/Tasks`, recordData)
            await api.delete(`/api/Tasks/${orders.id}`)
            setOpenDialog(false);
            orders.IsClick("true");

        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }
    }
    const handleCreate = async () => {
        setOpenDialog(true)
    }
    return (
        <Box id={orders.id} sx = {{ width: '80%', height: '100%', bgcolor: '#272727', mt: 6, }
}
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
                    <Stack direction="row" sx={{ mt: 2 }}>
                        <Typography sx={{ color: "#00BA78" }}>Категория: </Typography>
                        <Typography sx={{ color: "#fff", ml: 1 }}>{orders.category}</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography sx={{ color: "#00BA78" }}>Прайс: </Typography>
                        <Typography sx={{ color: "#fff", ml: 1 }}>{orders.price}₽</Typography>
                    </Stack>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleDelete} aria-label="add to favorites">
                        <DeleteIcon sx={{ color: '#900020' }} />
                    </IconButton>
                    <IconButton onClick={handleCreate} sx={{ color: '#00BA78' }} aria-label="share">
                        <CreateIcon />
                    </IconButton>
                </CardActions>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>
                        Создание заказа
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ width: '100%', height: '100%', bgcolor: '#272727', mt: 6, }}
                            borderRadius={5}>
                            <Card sx={{ maxWidth: '100%', bgcolor: '#272727' }}>
                                <br />
                                <CardContent>
                                    <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Заголовок" variant="outlined" placeholder="Введите заголовок" id={orders.id + "title"} />
                                    <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Категория" variant="outlined" placeholder="Введите категорию" />
                                    <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Цена" variant="outlined" placeholder="Введите цену" id={orders.id + "price"} />
                                    <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Описание" variant="outlined" placeholder="Придумайте описание" id={orders.id + "description"} />
                                    <Button onClick={clickCreate} variant="contained" sx={{ justifyContent: "center", marginLeft: "20%", backgroundColor: " #6FCF9780", '&:hover': { bgcolor: '#6FCF97', textAlign: "center" }, border: "6FCF97", marginBottom: 2, marginTop: 2, width: '60%' }}>Создать</Button>
                                </CardContent>
                                <CardActions disableSpacing>
                                </CardActions>
                            </Card>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Card>
        </Box>
    )
}