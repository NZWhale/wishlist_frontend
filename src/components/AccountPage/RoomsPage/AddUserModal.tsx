import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {DialogContentText} from "@material-ui/core";
import {sendAddUserRequest} from "./sendAddUserRequest";

interface IAddUserModal {
    onChange: () => void,
    roomId: string
}


class AddUserModal extends React.Component<IAddUserModal> {
    state = {
        isOpen: false,
        userEmail: "",
    }

    addUserHandler = () => {
        if (!this.state.userEmail) {
            alert('Email required')
            return
        }
        sendAddUserRequest(this.state.userEmail, this.props.roomId)
            .then((response: Response) => {
                if (!response.ok) {
                    alert("User not found")
                    this.setState({isOpen: false});
                }
                this.props.onChange()
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
                            Here u can add new user.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email"
                            type="user email"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({userEmail: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={async () => {
                            await this.addUserHandler()

                        }} color="primary">

                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default AddUserModal