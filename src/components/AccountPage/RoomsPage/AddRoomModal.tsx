import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {DialogContentText} from "@material-ui/core";
import {sendCreateRoomRequest} from "./sendCreateRoomRequest";

interface IFormDialog {
    onChange: () => void
}


class AddRoomModal extends React.Component<IFormDialog> {
    state = {
        isOpen: false,
        roomName: "",
    }

    createRoomHandler = () => {
        if (!this.state.roomName) {
            alert('Description required')
            return
        }
        sendCreateRoomRequest(this.state.roomName)
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

    render() {
        const {isOpen} = this.state
        return (
            <>
                <IconButton edge="end" aria-label="add" onClick={this.handleClickOpen}>
                    <AddBoxIcon/>
                </IconButton>
                <Dialog open={isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogContentText style={{textAlign: "center"}}>
                            Here u can create new room.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Room name"
                            type="room name"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({roomName: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={async () => {
                            await this.createRoomHandler()

                        }} color="primary">

                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default AddRoomModal