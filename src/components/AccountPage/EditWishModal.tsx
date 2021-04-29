import React, {ChangeEvent, CSSProperties} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import {Chip, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select, Switch} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {sendEditWishRequest} from "./relatedFunctions/sendEditWishRequest";
import {IRoomRow} from "../../interfaces";
import {sendGetLoggedInUserRoomsRequest} from "./relatedFunctions/sendGetLoggedInUserRoomsRequest";

interface IEditFormDialog {
    wishTitle: string,
    wishDescription: string,
    wishId: string,
    isPublic: boolean | string[]
    onChange: () => void,
    classes: any
    getStyles: (room: string, rooms: IRoomRow[]) => CSSProperties | undefined
}


class EditWishModal extends React.Component<IEditFormDialog> {
    state = {
        isOpen: false,
        isPublic: typeof(this.props.isPublic) === "boolean",
        title: "",
        description: "",
        roomsForDisplayWish: typeof(this.props.isPublic) != "boolean"?this.props.isPublic:[],
        usersRooms: [] || null,
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
                console.log(data)
            })
    }

    editWishHandler = () => {
        const isPublic = this.state.isPublic?this.state.isPublic:this.state.roomsForDisplayWish
        sendEditWishRequest(this.props.wishId, this.state.title, this.state.description, isPublic)
            .then((response: Response) => {
                if (response.status === 200) {
                    this.props.onChange()
                    this.setState({isOpen: false});

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
        const {isOpen, isPublic, usersRooms, roomsForDisplayWish} = this.state
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
            <div>
                <IconButton edge="start" aria-label="edit" onClick={this.handleClickOpen}>
                    <EditIcon/>
                </IconButton>
                <Dialog open={isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="title"
                            defaultValue={this.props.wishTitle}
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({title: e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="description"
                            defaultValue={this.props.wishDescription}
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
                        <Button onClick={() => {
                            this.props.onChange()
                            this.handleClose()
                        }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={async () => {
                            await this.editWishHandler()
                            this.props.onChange()
                        }} color="primary">

                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditWishModal