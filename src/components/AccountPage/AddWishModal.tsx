import React, {ChangeEvent, CSSProperties} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {
    Chip,
    DialogContentText,
    FormControl,
    FormControlLabel, Input,
    InputLabel,
    MenuItem,
    Select,
    Switch
} from "@material-ui/core";
import {sendAddWishRequest} from "../relatedFunctions/sendAddWishRequest";
import {sendGetLoggedInUserRoomsRequest} from "../relatedFunctions/sendGetLoggedInUserRoomsRequest";
import {IRoomRow} from "../../interfaces";
import Snackbar from "@material-ui/core/Snackbar";

interface IAddWishModal {
    onChange: () => void,
    classes: any
    getStyles: (room: string, rooms: IRoomRow[]) => CSSProperties | undefined
}


class AddWishModal extends React.Component<IAddWishModal> {
    state = {
        isOpen: false,
        isPublic: true,
        roomsForDisplayWish: [],
        usersRooms: [] || null,
        title: "",
        description: "",
        isError: false,
        errorMessage: ""
    }

    componentDidMount() {
        sendGetLoggedInUserRoomsRequest()
            .then((response: Response) => {
                if(!response.ok){
                    this.setState({usersRooms: null})
                    return
                }
                return response.json()
            })
            .then((data: IRoomRow[]) => {
                this.setState({usersRooms: data})
            })
    }

    addWishHandler = () => {
        if (!this.state.title) {
            this.setState({
                errorMessage: 'Title required',
                isError: true
            })
            setTimeout(() => {this.setState({isError: false})}, 1000)
            return
        }

        const isPublic = this.state.isPublic?this.state.isPublic:this.state.roomsForDisplayWish

        sendAddWishRequest(this.state.title, this.state.description, isPublic)
            .then((response: Response) => {
                if (response.status === 200) {
                    this.setState({
                        roomsForDisplayWish: [],
                        title: "",
                        description: "",
                        isOpen: false
                    })
                    this.props.onChange()
                }
            })
            .catch((err: Error) => {
                alert(err)
                this.setState({isOpen: false});
            })
    }

    handleClickOpen = () => {
        this.setState({isOpen: true});
    };

    handleClose = () => {
        this.setState({isOpen: false});
    };

    toggleChecked = () => {
        this.setState({isPublic: !this.state.isPublic})
    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({roomsForDisplayWish: event.target.value});
    };


    render() {
        const {isOpen, isPublic, usersRooms, roomsForDisplayWish, isError, errorMessage} = this.state
        const {classes} = this.props
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        return (
            <>
                <IconButton edge="end" aria-label="add" onClick={this.handleClickOpen}>
                    <AddBoxIcon/>
                </IconButton>
                <Dialog open={isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    {isError &&
                    <>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={isError}
                            onClose={() => this.setState({isError: false})}
                            message={errorMessage}
                        />
                    </>
                    }
                    <DialogContent>
                        <DialogContentText style={{textAlign: "center"}}>
                            Here u can add new wishes.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            label="Title"
                            type="title"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({title: e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="description"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({description: e.target.value})}
                        />
                        <FormControlLabel style={{marginTop: "12px"}}
                                          control={<Switch size="small" color="primary" checked={isPublic}
                                                           onChange={this.toggleChecked}/>} label={"Public"}/>
                        {!isPublic &&
                        <FormControl className={classes.formControl}>
                            <InputLabel id="selectRoomsInputLable">Select rooms</InputLabel>
                            <Select
                                labelId="selectRoomsInputLable"
                                multiple
                                value={roomsForDisplayWish}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {(selected as string[]).map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {usersRooms.map((room: IRoomRow) => (
                                    <MenuItem key={room.roomId} value={room.roomName} style={this.props.getStyles(room.roomName, usersRooms)}>
                                        {room.roomName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={async () => {
                            await this.addWishHandler()
                        }} color="primary">

                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default AddWishModal