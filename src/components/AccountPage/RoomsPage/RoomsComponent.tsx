import React, {Component} from "react";
import {IRoomRow} from "../../../interfaces";
import {getAllRoomsRequest} from "./getAllRoomsRequest";
import AlignCenter from "../../../reusableComponents/AlignCenter";
import {AppBar, CircularProgress, Paper, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddRoomModal from "./AddRoomModal";
import Grid from "@material-ui/core/Grid";
import SingleRoomComponent from "./SingleRoomComponent";

interface IRoomsComponentProps {
    classes: any,
    onChange: () => void
}

class RoomsComponent extends Component<IRoomsComponentProps> {
    state = {
        isLoading: true,
        isError: false,
        errorMessage: "",
        rooms: [] as IRoomRow[],
        renderedRoom: {} as IRoomRow,
        clicked: false
    }

    getRooms(){
        getAllRoomsRequest()
            .then((response: Response) => {
                if (!response.ok) {
                    this.setState({isError: true})
                    this.setState({errorMessage: "Can't get user's wishes"})
                    //Delay for beauty
                    setTimeout(() => {
                        this.setState({isError: false})
                        this.setState({isLoaded: true})
                    }, 3000)
                    return
                }
                return response.json()
            })
            .then((data: IRoomRow[]) => {
                this.setState({rooms: data})
                setTimeout(() => {
                    this.setState({isLoading: false})
                }, 1000)
            })
    }

    componentDidMount() {
        this.getRooms()
    }


    render() {
        const {isLoading, rooms, clicked} = this.state
        const {classes, onChange} = this.props
        let roomsComponent
        if (!rooms || rooms.length === 0) {
            roomsComponent = <div style={{textAlign: "center"}}>You don't have wishes yet</div>
        } else {
            roomsComponent = rooms.map((room: IRoomRow, key: number) =>
                <Grid key={key} item onClick={() => {
                    this.setState({
                        renderedRoom: room,
                        clicked: true
                    })
                    console.log(this.state)
                }}>
                    <Paper className={classes.paper} elevation={3}>
                        {room.roomName}
                    </Paper>
                </Grid>
            )
        }

        if (clicked) {
            return <SingleRoomComponent room={this.state.renderedRoom} backHandler={() => this.setState({clicked: false})} onChange={() => {
                this.getRooms()
                onChange()
            }}/>
        }

        return (
            <>
                <AppBar
                    position="static"
                    color="primary"
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" className={classes.title}>
                            Rooms
                        </Typography>
                        <div style={{display: "flex"}}>
                            <AddRoomModal onChange={() => onChange()}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}>
                    {isLoading &&
                    <AlignCenter>
                        <CircularProgress/>
                    </AlignCenter>
                    }
                    {!isLoading &&
                    <Grid container className={classes.root} spacing={10} style={{width: "auto", margin: "auto", }}>
                        <Grid container justify="center" spacing={10} style={{width: "auto", margin: "auto"}}>
                            {roomsComponent}
                        </Grid>
                    </Grid>
                    }
                </div>
            </>
        )
    }
}

export default RoomsComponent