import React, {useEffect} from "react";
import {Accordion, AccordionDetails, AccordionSummary, AppBar, CircularProgress, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IRoomRow, IWishRow} from "../../../interfaces";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SinglePublicWish from "../../PublicPage/SinglePublicWish";
import AlignCenter from "../../../reusableComponents/AlignCenter";
import Snackbar from "@material-ui/core/Snackbar";
import {getWishesByUserIdRequest} from "./getWishesByUserId";
import {getUsernameByUserIdRequest} from "./getUsernameByUserId";

interface SingleRoomProps {
    room: IRoomRow,
    backHandler: () => void
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
            paddingLeft: 0
        },
    }),
);


function SingleRoomComponent(roomProps: SingleRoomProps) {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [users, setUsers] = React.useState<Array<IUserProps>>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const classes = useStyles();
    const room = roomProps.room

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
                    setIsError(true)
                    setErrorMessage(`Can't get user's wishes`)
                    //Delay for beauty
                    setTimeout(() => {
                        setIsError(false)
                    }, 1000)
                    return
                }
                return response.text()
            })
            if(!userName){
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
                }, 500)
            }
        })
    }, [])

    const handleClick = () => {
        roomProps.backHandler()
    }

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    const usersComponent = users.map((user: IUserProps, key: number) =>
        <Accordion expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{user.username}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{flexDirection: "column"}}>
                {user.wishes.map((wish: IWishRow, key: number) =>
                    <SinglePublicWish wishTitle={wish.title} wishDescription={wish.description} key={key}/>
                )}
            </AccordionDetails>
        </Accordion>
    )

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
                </Toolbar>
            </AppBar>
            <div style={{
                marginTop: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll"
            }}
            >
                {!isLoaded &&
                <AlignCenter>
                    <CircularProgress/>
                </AlignCenter>
                }
                {isLoaded &&
                <>
                    {usersComponent}
                </>
                }
            </div>
        </>
    )
}

export default SingleRoomComponent