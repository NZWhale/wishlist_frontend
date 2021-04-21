import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from "@material-ui/icons/Settings";
import SubjectIcon from '@material-ui/icons/Subject';
import AlignCenter from "../../reusableComponents/AlignCenter";
import {getLoggedInUserWishesUrl} from "../../config";
import {IWishRow} from "../../interfaces";
import SingleWish from "./SingleWish";
import AppsIcon from '@material-ui/icons/Apps';
import {CircularProgress} from "@material-ui/core";
import SettingsComponent from "./SettingsComponent";
import Snackbar from "@material-ui/core/Snackbar";
import {RouteComponentProps, withRouter} from "react-router-dom";
import WishesComponent from "./WishesComponent";
import RoomsComponent from "./RoomsPage/RoomsComponent";

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
            margin: theme.spacing(),
            justifyContent: "space-between",
            display: "flex"
        },
        toolbar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        paper: {
            height: 140,
            width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
    }),
);

function AccountPage(props: RouteComponentProps) {
    const [wishes, setWishes] = React.useState<IWishRow[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [value, setValue] = React.useState('rooms');
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    let wishesList
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        console.log(newValue)
    };

    useEffect(() => {
        fetch(getLoggedInUserWishesUrl, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response: Response) => {
                if (!response.ok) {
                    setIsError(true)
                    setErrorMessage("Cookie doesn't exist, you will redirect to auth page")
                    //Delay for beauty
                    setTimeout(() => {
                        setIsLoaded(true)
                        props.history.push('/registration')
                    }, 1500)
                }
                return response.json()
            })
            .then((data: IWishRow[]) => {
                setWishes(data)
                //Delay for beauty
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000)
            })
    }, [isModalOpen, props.history])
    if (wishes.length === 0 || !wishes) {
        wishesList = <div style={{textAlign: "center"}}>You don't have wishes yet</div>
    } else {
        wishesList = wishes.map((wish: IWishRow, key: number) =>
            <SingleWish wishTitle={wish.title}
                        wishDescription={wish.description}
                        wishId={wish.wishId}
                        isPublic={wish.isPublic}
                        key={key}
                        onChange={() => setModalOpen(!isModalOpen)}
            />
        )
    }
    if (isError) {
        return (
            <>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={isError}
                    onClose={() => setIsError(false)}
                    message={errorMessage}
                />
            </>
        )
    }

    if (!isLoaded) {
        return (
            <AlignCenter>
                <CircularProgress/>
            </AlignCenter>
        )
    }

    return (
        <>
            {value === 'rooms' &&
            <RoomsComponent classes={classes} onChange={() => setModalOpen(!isModalOpen)}/>
            }
            {value === 'wishlist' &&
            <WishesComponent classes={classes} wishesList={wishesList} onChange={() => setModalOpen(!isModalOpen)}/>
            }
            {value === 'settings' &&
            <SettingsComponent onChange={() => setModalOpen(!isModalOpen)}/>
            }
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Rooms" value="rooms" icon={<AppsIcon/>}/>
                <BottomNavigationAction label="Wishlist" value="wishlist" icon={<SubjectIcon/>}/>
                <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon/>}/>
            </BottomNavigation>
        </>
    );
}

export default withRouter(AccountPage)