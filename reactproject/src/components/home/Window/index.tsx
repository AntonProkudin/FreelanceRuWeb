import {Stack} from "@mui/material";
import {NewsItem} from "./newsItem";
import { IPublicActiveMenu, NewsItems } from "../../../common/types/news";
import { useEffect, useState } from "react";
import { useAuthInstance } from "../../../utils/axios";
import { MyProfile } from "./myProfile";
import { MyOrders } from "./myOrders";
import { Stock } from "./Stock";
export function Window(props: IPublicActiveMenu) {

    const [data, setData] = useState<NewsItems[]>([]);
    const api = useAuthInstance()
    const [isClick, setIsClick] = useState('false');
    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await api.get(`/api/News?ts=${new Date().toUTCString()}`) 
                setData(response.data); 
                setIsClick("")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }
        };

        getNews(); // Вызываем функцию для получения данных при монтировании компонента
    }, [isClick]);

    if (props.location === "Новости") {
        return (

            <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {data.map((item) => (
                    <NewsItem
                        key={item.id} // Важно добавить ключ для каждой карточки
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        ts={item.ts}
                        url={item.url}
                    />
                ))}
            </Stack>

        )
    }
    if (props.location === "Профиль") {
        return (
            <MyProfile />

        )
    }
    if (props.location === "Мои заказы") {
        return (
            <MyOrders />

        )
    }
    if (props.location === "Биржа заказов") {
        return (
            <Stock />

        )
    }
        return (
            <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            </Stack>
        )
    
}