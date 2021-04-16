import React, {Component} from "react";
import {IRoomRow} from "../../interfaces";
import {getAllRoomsRequest} from "./getAllRoomsRequest";
import AlignCenter from "../../reusableComponents/AlignCenter";
import {AppBar, CircularProgress, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddRoomModal from "./AddRoomModal";

interface IRoomsComponentProps {
    classes: any,
    onChange: () => void
}

class RoomsComponent extends Component<IRoomsComponentProps> {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        rooms: [] as IRoomRow[]
    }

    componentDidMount() {
        getAllRoomsRequest()
            .then((response: Response) => {
                if(!response.ok){
                    this.setState({isError:true})
                    this.setState({errorMessage: "Cann't get user's wishes"})
                    //Delay for beauty
                    setTimeout(() => {
                        this.setState({isError:false})
                        this.setState({isLoaded: true})
                    }, 3000)
                    return
                }
                return response.json()
            })
            .then((data: IRoomRow[]) => {
                this.setState({rooms: data})
                setTimeout(() => {
                    this.setState({isLoaded: true})
                }, 1000)
            })
    }


    render() {
        const {isLoading, rooms } = this.state
        const {classes, onChange} = this.props
        const roomsComponent = rooms.map((room) =>
        <div>{room.roomName}</div>
        )
        if (isLoading) {
            return (
                <AlignCenter>
                    <CircularProgress />
                </AlignCenter>
            );
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
                    flexDirection: "column"
                }}>
            {roomsComponent?roomsComponent:"no rooms here"}
                </div>
            </>
        )
    }
}

export default RoomsComponent