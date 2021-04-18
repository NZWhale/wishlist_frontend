import {AppBar, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddWishModal from "./AddWishModal";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import React, { ReactElement} from "react";

interface IWishesComponentProps {
    classes: any,
    wishesList: ReactElement | ReactElement[],
    onChange: () => void
}

class WishesComponent extends React.Component<IWishesComponentProps>{
    render() {
        const {classes, wishesList, onChange} = this.props
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
                            <AddWishModal onChange={() => onChange()}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "scroll"}}>
                        <div className={classes.root}>
                            <Grid item xs={12} md={12}>
                                <div className={classes.demo}>
                                    <List>
                                        {wishesList}
                                    </List>
                                </div>
                            </Grid>
                        </div>
                </div>
            </>
        )
    }
}

export default WishesComponent