import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import { NewsItems } from "../../../../common/types/news";
import { green } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export function NewsItem(news: NewsItems) {

    return (
        <Box sx={{width: '80%', height: '100%', bgcolor: '#272727', mt: 6,}}
             borderRadius={5}>
            <Card sx={{ maxWidth: '100%', bgcolor: '#272727' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                            New
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" sx={{color: '#00BA78' }} >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={news.title}
                    subheader={`${news.ts}`}
                />
                <CardMedia
                    sx={{ objectFit: 'contain', maxHeight:720 }}
                    component="img"
                    image={news.url}
                />
                <CardContent>
                    <Typography variant="body2" color="#F8F6F0">{news.description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: 'pink' }} />
                    </IconButton>
                    <IconButton sx={{ color: '#00BA78' }} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    )
}