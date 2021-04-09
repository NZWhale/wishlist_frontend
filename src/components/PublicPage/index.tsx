import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar} from "@material-ui/core"
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlignCenter from "../../reusableComponents/AlignCenter";
import {IWishRow} from "../../interfaces";
import {Button, CircularProgress} from "@material-ui/core";
import {match, RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import SinglePublicWish from "./SinglePublicWish";
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import {getPublicWishesRequest} from "./getPubliceWishesRequest";
import Snackbar from "@material-ui/core/Snackbar";

function PublicPage(props: RouteComponentProps) {
    const [wishes, setWishes] = React.useState<IWishRow[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    interface MyParams {
        username: string
    }

    let history = useHistory();
    const myMatch = props.match as match<MyParams>
    const {username} = myMatch.params
    let wishesList

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
                justifyContent: "center",
                display: "flex"
            },
            toolbar: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }
        }),
    );

    useEffect(() => {
        getPublicWishesRequest(username)
            .then((response: Response) => {
                if(!response.ok){
                    setIsError(true)
                    setErrorMessage("Cann't get user's wishes")
                    //Delay for beauty
                    setTimeout(() => {
                        setIsError(false)
                        setIsLoaded(true)
                    }, 3000)
                    return
                }
                return response.json()
            })
            .then((data: IWishRow[]) => {
                setWishes(data)
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000)
            })
    }, [])

    const classes = useStyles();
    if (!wishes) {
        wishesList = <>
        </>
    } else {
        wishesList = wishes.map((wish: IWishRow, key: number) =>
            <SinglePublicWish wishTitle={wish.title}
                              wishDescription={wish.description}
                              key={key}
            />
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
            <>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={isError}
                    onClose={() => setIsError(false)}
                    message={errorMessage}
                    key={"top" + "center"}
                />
            </>
            <AppBar
                position="static"
                color="primary"
            >
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title}>
                        {username}'s wishlist
                    </Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className="root"
                        startIcon={<VpnKeySharpIcon/>}
                        onClick={() => history.push("/registration")}
                    >
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
            <div style={{height: "100%", overflow: "scroll"}}>
            <AlignCenter>
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
        </>
    );
}

export default withRouter(PublicPage)