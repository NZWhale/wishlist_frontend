import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from "@material-ui/icons/Settings";
import SubjectIcon from '@material-ui/icons/Subject';
import {IRoomRow, IWishRow} from "../../interfaces";
import SingleWish from "./SingleWish";
import AppsIcon from '@material-ui/icons/Apps';
import SettingsComponent from "./SettingsComponent";
import Snackbar from "@material-ui/core/Snackbar";
import {RouteComponentProps, withRouter} from "react-router-dom";
import WishesComponent from "./WishesComponent";
import RoomsComponent from "./RoomsPage/RoomsComponent";
import {sendGetLoggedInUserWishesRequest} from "../relatedFunctions/sendGetLoggedInUserWishesRequest";
import {useTheme} from "@material-ui/core";
import AlignCenter from "../../reusableComponents/AlignCenter";

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
        formControl: {
            marginTop: theme.spacing(1),
            minWidth: "100%",
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

function AccountPage(props: RouteComponentProps) {
    const [wishes, setWishes] = React.useState<IWishRow[]>([]);
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [value, setValue] = React.useState('wishlist');
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    let wishesList
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };
    const theme = useTheme();
    function getStyles(room: string, rooms: IRoomRow[]) {
        let roomsNames = rooms.map((room: IRoomRow) => room.roomName)
        return {
            fontWeight:
                roomsNames.indexOf(room) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    useEffect(() => {
        sendGetLoggedInUserWishesRequest()
            .then((response: Response) => {
                if (!response.ok) {
                    setIsError(true)
                    setErrorMessage("Cookie doesn't exist, you will redirect to auth page")
                    //Delay for beauty
                    setTimeout(() => {
                        props.history.push('/authorise')
                    }, 1500)
                    return
                }
                return response.json()
            })
            .then((data: IWishRow[]) => {
                setWishes(data)
            })
    }, [isModalOpen, props.history])
    if (!wishes || wishes.length === 0) {
        wishesList = <AlignCenter>
            <div style={{textAlign: "center"}}>You don't have wishes yet</div>
            </AlignCenter>
    } else {
        wishesList = wishes.map((wish: IWishRow, key: number) =>
            <SingleWish wishTitle={wish.title}
                        wishDescription={wish.description}
                        wishId={wish.wishId}
                        isPublic={wish.isPublic}
                        key={key}
                        onChange={() => setModalOpen(!isModalOpen)}
                        getStyles={(room: string, rooms: IRoomRow[]) => getStyles(room, rooms)}
                        classes={classes}
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


    return (
        <>
            {value === 'rooms' &&
            <RoomsComponent classes={classes} onChange={() => setModalOpen(!isModalOpen)}/>
            }
            {value === 'wishlist' &&
            <WishesComponent classes={classes} wishesList={wishesList} onChange={() => setModalOpen(!isModalOpen)} getStyles={(room: string, rooms: IRoomRow[]) => getStyles(room, rooms)}/>
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