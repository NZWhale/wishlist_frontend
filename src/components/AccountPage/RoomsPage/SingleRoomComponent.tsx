import React, {useEffect} from "react";
import {
    AppBar, Avatar, Badge,
    CircularProgress, Divider, List, ListItem,
    ListItemIcon, ListItemText,
    Toolbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";
import {IRoomRow, IWishRow} from "../../../interfaces";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SinglePublicWish from "../../PublicPage/SinglePublicWish";
import AlignCenter from "../../../reusableComponents/AlignCenter";
import Snackbar from "@material-ui/core/Snackbar";
import {getWishesByUserIdRequest} from "./relatedFunctions/getWishesByUserId";
import {getUsernameByUserIdRequest} from "./relatedFunctions/getUsernameByUserId";
import AddUserModal from "./AddUserModal";

interface SingleRoomProps {
    room: IRoomRow,
    backHandler: () => void,
    onChange: () => void,
}

interface IUserProps {
    username: string,
    wishes: IWishRow[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        title: {
            margin: theme.spacing(),
            justifyContent: "space-between",
            display: "flex"
        },
        toolbar: {
            display: "flex",
            flexDirection: "row",
            paddingLeft: 0,
            justifyContent: "space-between"
        },
    }),
);


function SingleRoomComponent(roomProps: SingleRoomProps) {
    const [clicked, setClicked] = React.useState<boolean>(false)
    const [renderedUser, setRenderedUser] = React.useState<IUserProps>({} as IUserProps)
    const [users, setUsers] = React.useState<Array<IUserProps>>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const classes = useStyles();
    const room = roomProps.room
    const onChange = roomProps.onChange

    useEffect(() => {
        const users: Array<IUserProps> = []
        room.users.forEach(async (userId: string, index: number) => {
            const wishes: IWishRow[] = await getWishesByUserIdRequest(userId).then((response) => {
                if (!response.ok) {
                    setIsError(true)
                    setErrorMessage(`Can't get user's wishes`)
                    //Delay for beauty
                    setTimeout(() => {
                        setIsError(false)
                    }, 1000)
                    return
                }
                return response.json()
            })
            const userName = await getUsernameByUserIdRequest(userId).then((response: Response) => {
                if (!response.ok) {
                    return 'Anonymous'
                }
                return response.text()
            })
            if (!userName) {
                setIsError(true)
                setErrorMessage(`Can't get username`)
                //Delay for beauty
                setTimeout(() => {
                    setIsError(false)
                }, 1000)
                return
            }
            const userData = {
                username: userName,
                wishes: wishes
            }
            users.push(userData)

            if (room.users.length - 1 === index) {
                setUsers(users)
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000)
            }
        })
    }, [])

    const handleClick = () => {
        roomProps.backHandler()
    }

    let usersComponent

    if (!users || users.length === 0) {
        usersComponent = <div style={{textAlign: "center"}}>User doesn't have wishes yet</div>
    } else {
        usersComponent = <List>
            {
                users.map((user: IUserProps, key: number) =>
                    <>
                        <ListItem
                            button
                            key={key}
                            onClick={() => {
                                setRenderedUser(user)
                                setClicked(true)
                            }}
                        >

                            <ListItemIcon children={<Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                // badgeContent={<div style={{
                                //     background: "#21ed4f",
                                //     width: "10px",
                                //     height: "10px",
                                //     borderRadius: "10px"
                                // }}/>}
                            >
                                <Avatar alt={user.username} src="/static/images/avatar/2.jpg"/>
                            </Badge>}/>
                            <ListItemText primary={user.username}/>
                        </ListItem>
                        <Divider/>
                    </>
                )
            }
        </List>
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

    if (clicked) {
        return (
            <>
                <AppBar
                    position="static"
                    color="primary"
                >
                    <Toolbar style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: 0,
                    }}>
                        <div style={{display: "flex"}}>
                            <IconButton edge="end" aria-label="add" onClick={() => setClicked(false)}>
                                <ArrowBackIcon/>
                            </IconButton>
                        </div>
                        <Typography variant="h6" className={classes.title}>
                            {renderedUser.username}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "scroll"
                }}>
                    <List>
                        {renderedUser.wishes.map((wish: IWishRow, key: number) => {
                            let isRoomIncludeWish
                            if (typeof (wish.isPublic) != "boolean") {
                                wish.isPublic.forEach((isInRoom: string) => {
                                    if (isInRoom === room.roomName) {
                                        isRoomIncludeWish = true
                                    }
                                })
                            }
                            if (typeof (wish.isPublic) === "boolean") {
                                return <SinglePublicWish wishTitle={wish.title} wishDescription={wish.description}
                                                         key={key}/>
                            }
                            if (!isRoomIncludeWish) {
                                return <div/>
                            }
                            return <SinglePublicWish wishTitle={wish.title} wishDescription={wish.description}
                                                     key={key}/>
                        })}
                    </List>
                </div>
            </>
        )
    }

    return (
        <>
            <AppBar
                position="static"
                color="primary"
            >
                <Toolbar className={classes.toolbar}>
                    <div style={{display: "flex"}}>
                        <IconButton edge="end" aria-label="add" onClick={handleClick}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                        {room.roomName} room
                    </Typography>
                    <div style={{display: "flex"}}>
                        <AddUserModal onChange={() => onChange()} roomId={room.roomId}/>
                    </div>
                </Toolbar>
            </AppBar>
            {!isLoaded &&
            <AlignCenter>
                <CircularProgress/>
            </AlignCenter>
            }
            {isLoaded &&
            <div style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll"
            }}
            >
                {usersComponent}
            </div>
            }
        </>
    )
}

export default SingleRoomComponent