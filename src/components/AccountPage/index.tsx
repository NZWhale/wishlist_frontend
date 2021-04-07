import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlignCenter from "../../reusableComponents/AlignCenter";
import {getLoggedInUserWishesUrl} from "../../config";
import {IWishRow} from "../../interfaces";
import SingleWish from "./SingleWish";
import {CircularProgress} from "@material-ui/core";
import FormDialog from "./AddWishModal";


function AccountPage() {
    const [wishes, setWishes] = React.useState<IWishRow[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                maxWidth: 752,
            },
            demo: {
                backgroundColor: theme.palette.background.paper,
            },
            title: {
                margin: theme.spacing(4, 4, 2),
                justifyContent: "space-between",
                display: "flex"
            },
        }),
    );

    useEffect(() => {
        fetch(getLoggedInUserWishesUrl, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response: Response) => response.json())
            .then((data: IWishRow[]) => {
                setWishes(data)
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000)
            })
            .catch((err: Error) => alert(err))
    }, [])
    const classes = useStyles();
    const wishesList = wishes.map((wish: IWishRow, key: number) =>
        <SingleWish wishTitle={wish.title} wishDescription={wish.description} isPublic={wish.isPublic} key={key}/>
    )
    if (!isLoaded) {
        return (
            <AlignCenter>
                <CircularProgress/>
            </AlignCenter>
        )
    }
    return (
        <>
            <AlignCenter>
                <div className={classes.root}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" className={classes.title}>
                            WishList
                            <FormDialog onChange={(wish: IWishRow) => {setWishes(prevState  => ([...prevState, wish]))}}/>
                        </Typography>
                        <div className={classes.demo}>
                            <List>
                                {wishesList}
                            </List>
                        </div>
                    </Grid>
                </div>
            </AlignCenter>
        </>
    );
}

export default AccountPage