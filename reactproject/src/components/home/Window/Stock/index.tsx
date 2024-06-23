/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IPublicMyOrders } from "../../../../common/types/orders";
import { useAuthInstance } from "../../../../utils/axios";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { StockItem } from "./StockItem";

export function Stock() {

    const [data, setData] = useState<IPublicMyOrders[]>([]);
    const [data2, setData2] = useState<any[]>([]);
    const [category, setCategory] = useState('');
    const api = useAuthInstance()
    const [isClick, setIsClick] = useState('false');

    const handleSelect = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get(`/api/Tasks?ts=${new Date().toUTCString()}`)
                setData(response.data);
                const response2 = await api.get(`/api/Tasks/Category/`)
                setData2(response2.data);
                setIsClick("")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }
        };

        getOrders(); // Вызываем функцию для получения данных при монтировании компонента
    }, [isClick]);

    return (

        <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Select onChange={handleSelect} id="select" color="success" value={category} sx={{ mt: 2, width: "30%" }}>
                <MenuItem value="">Без фильтра</MenuItem>
                {data2.map((item) => (
                    <MenuItem value={item.title }>{item.title}</MenuItem>
                ))}
            </Select>
            {data.filter(order => order.category.includes(category)).map((item) => (
                <StockItem
                    key={item.id} // Важно добавить ключ для каждой карточки
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    ts={item.ts}
                    userId={item.userId}
                    category={item.category}
                    isCompleted={item.isCompleted}
                    price={item.price}

                />
            ))}
        </Stack>

    )
}