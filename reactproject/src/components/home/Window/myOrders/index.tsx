import { useEffect, useState } from "react";
import { IPublicMyOrders } from "../../../../common/types/orders";
import { useAuthInstance } from "../../../../utils/axios";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import { MyOrdersItemItem } from "./orderItem";
import AddIcon from '@mui/icons-material/Add';
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

export function MyOrders() {

    const [data, setData] = useState<IPublicMyOrders[]>([]);
    const api = useAuthInstance()
    const [isClick, setIsClick] = useState('false');
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get(`/api/Tasks/ThisUser?ts=${new Date().toUTCString()}`)
                setData(response.data);
                setIsClick("")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }
        };

        getOrders(); // Вызываем функцию для получения данных при монтировании компонента
    }, [isClick]);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const clickCreate = async () => {
        try {
            var time = new Date();
            var description = document.getElementById("description");
            var price = document.getElementById("price");
            var title = document.getElementById("title");
                const recordData = {
                    categoryId: 1,
                    price: price.value,
                    description: description.value,
                    title: title.value,
                    isCompleted: true,
                    ts: time,
                }
            const response = await api.post(`/api/Tasks`, recordData)
            description.value = '';
            price.value = '';
            title.value = '';
            setOpenDialog(false);
            setIsClick(true)
            
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }
    }
    const handleCreate = async () => {
        setOpenDialog(true)
    }

    return (

        <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={handleCreate} aria-label="settings" sx={{ backgroundColor: '#272727', color: '#00BA78', mt:5 }} >
                <AddIcon />
            </IconButton>
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
                                <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Заголовок" variant="outlined" placeholder="Введите заголовок" id="title" />
                                <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Категория" variant="outlined" placeholder="Введите категорию" />
                                <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Цена" variant="outlined" placeholder="Введите цену" id="price" />
                                <TextField color="success" autoComplete='off' sx={{ input: { placeholderColor: '#ffffff', color: 'white' } }} margin="normal" fullWidth={true} label="Описание" variant="outlined" placeholder="Придумайте описание" id="description" />
                                <Button onClick={clickCreate} variant="contained" sx={{ justifyContent: "center", marginLeft: "20%", backgroundColor: " #6FCF9780", '&:hover': { bgcolor: '#6FCF97', textAlign: "center" }, border: "6FCF97", marginBottom: 2, marginTop: 2, width: '60%' }}>Создать</Button>
                            </CardContent>
                            <CardActions disableSpacing>
                            </CardActions>
                        </Card>
                    </Box>
                </DialogContent>
            </Dialog>
            {data.map((item) => (
                <MyOrdersItemItem
                    key={item.id} // Важно добавить ключ для каждой карточки
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    ts={item.ts}
                    userId={item.userId}
                    category={item.category}
                    isCompleted={item.isCompleted}
                    price={item.price}
                    IsClick={setIsClick}

                />
            ))}
        </Stack>

    )
}