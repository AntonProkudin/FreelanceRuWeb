/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../../../../utils/hook";
import { Box, Button, Card, CardActions, CardContent, CardMedia, TextField} from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { ChangeEvent, useState } from "react";
import { useAuthInstance } from "../../../../utils/axios";
export function MyProfile() {

    const [user, setUser] = useState( useAppSelector(state => state.auth.user))
    const [file, setFile] = useState<File | null>(null);
    const api = useAuthInstance()

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        console.log("начало")
        if (files != null) {
            setFile(files[0])
            console.log(files[0])
            try {
                const data = new FormData();
                data.append('file', files[0]);
                const response = await api.post(`/api/Help/LoadImage`, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                await api.post(`/api/Users/SetUserAvatar`, `{"url": "${response.data.url}"}`)
                const response2 = await api.get('/api/Users/UserInfo')
                sessionStorage.setItem('userInfo', JSON.stringify(response2.data))
                let el = document.body.querySelector("#usercard")
                el.src = "https://192.168.1.105:7124"+response.data.url
                } catch (error) {
                    console.error('Ошибка при получении данных:', error)
            }
            
        }
            
    }
    return (

        <Box sx={{ width: '50%', height: '100%', bgcolor: '#272727', mt: 6, }}
            borderRadius={5}>
            <Card sx={{ maxWidth: '100%', bgcolor: '#272727' }}>
                <br />
                <CardMedia
                    id="usercard"
                    sx={{ objectFit: 'contain', maxHeight: 500 }}
                    component="img"
                    image={user?.avatar}/>
                
                <CardContent>
                    <SimpleTreeView>
                        <TreeItem itemId="file" label="Сменить аватар">
                            <label className="input-file">
                                <input type="file" name="file" onChange={handleChangeFile} />
                                <span>Выберите файл</span>
                            </label>
                        </TreeItem>
                        <TreeItem itemId="grid" label="Информация об аккаунте">
                            <TreeItem itemId="grid-community" label={`Имя: ${user?.firstName}`} />
                            <TreeItem itemId="grid-community2" label={`Фамилия: ${user?.lastName}`} />
                            <TreeItem itemId="grid-community3" label={`Почта: ${user?.email}`} />
                        </TreeItem>
                        <TreeItem itemId="pickers" label="Навыки">
                            {user?.userSkills.map((skill) => (
                                <TreeItem itemId={skill.id} label={`${skill.title}`} />
                            ))}
                            <TreeItem itemId="addd" label="Добавить">
                                <TextField autoComplete='off' sx={{ input: { color: '#ffffff' } }} type="search" margin="normal" fullWidth={true} label="Новый навык" variant="filled" color="success" placeholder="Введите новый навык" inputProps={{ autoComplete: 'off', form: { autoComplete: 'off', }, }} />
                                <Button color="success">Добавить</Button>
                            </TreeItem>
                        </TreeItem>
                    </SimpleTreeView>
                </CardContent>
                <CardActions disableSpacing>
                </CardActions>
            </Card>
        </Box>

    );


}
//{/*onChange={(e) => setEmail(e.target.value)}*/ }