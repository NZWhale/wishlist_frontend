import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AlignCenter from "../../reusableComponents/AlignCenter";
import { getPublicWishesUrl} from "../../config";
import {IWishRow} from "../../interfaces";
import {Button, CircularProgress} from "@material-ui/core";
import {match, RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import SinglePublicWish from "./SinglePublicWish";
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';

function PublicPage(props: RouteComponentProps) {
    const [wishes, setWishes] = React.useState<IWishRow[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false)
    interface MyParams {
        username: string
    }
    let history = useHistory();
    const myMatch = props.match as match<MyParams>
    const { username } = myMatch.params
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
                margin: theme.spacing(4, 4, 2),
                justifyContent: "center",
                display: "flex"
            },
        }),
    );

    useEffect(() => {
        fetch(getPublicWishesUrl+username, {
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
    })

    const classes = useStyles();
    if(!wishes.length){
        wishesList = <>User haven't wishes</>
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
            <AlignCenter>
                <div className={classes.root}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" className={classes.title}>
                            {username}'s wishlist
                        </Typography>
                        <div style={{display: "flex", justifyContent: "flex-end", padding: "16px"}}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className="root"
                                startIcon={<VpnKeySharpIcon />}
                                onClick={() => history.push("/registration")}
                            >
                                Sign Up
                            </Button>
                        </div>
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

export default withRouter(PublicPage)