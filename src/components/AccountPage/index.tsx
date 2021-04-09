import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from "@material-ui/icons/Settings";
import SubjectIcon from '@material-ui/icons/Subject';
import Typography from '@material-ui/core/Typography';
import AlignCenter from "../../reusableComponents/AlignCenter";
import {getLoggedInUserWishesUrl} from "../../config";
import {IWishRow} from "../../interfaces";
import SingleWish from "./SingleWish";
import {AppBar, CircularProgress, Toolbar} from "@material-ui/core";
import AddWishModal from "./AddWishModal";
import SettingsModal from "./SettingsModal";

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
            margin: theme.spacing( 4, 2),
            justifyContent: "space-between",
            display: "flex"
        },
        toolbar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }
    }),
);

function AccountPage() {
    const [wishes, setWishes] = React.useState<IWishRow[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isModalOpen, setModalOpen] = React.useState(false)
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

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
    }, [isModalOpen])

    const wishesList = wishes.map((wish: IWishRow, key: number) =>
        <SingleWish wishTitle={wish.title}
                    wishDescription={wish.description}
                    wishId={wish.wishId}
                    isPublic={wish.isPublic}
                    key={key}
                    onChange={() => setModalOpen(!isModalOpen)}
        />
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
            <AppBar
                position="static"
                color="primary"
            >
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        WishList

                    </Typography>
                    <div style={{display: "flex"}}>
                        <SettingsModal/>
                        <AddWishModal onChange={() => setModalOpen(!isModalOpen)}/>
                    </div>
                </Toolbar>

            </AppBar>
            <div style={{height: "100%", overflow: "scroll"}}>
            <AlignCenter >
                <div className={classes.root}>
                    <Grid item xs={12} md={12}>
                        <div className={classes.demo}>
                            <List>
                                {wishesList}
                            </List>
                        </div>
                    </Grid>
                </div>
            </AlignCenter>
            </div>
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Wishlist" value="wishlist" icon={<SubjectIcon />} />
                <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </>
    );
}

export default AccountPage