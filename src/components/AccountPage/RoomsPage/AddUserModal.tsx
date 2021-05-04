import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {DialogContentText} from "@material-ui/core";
import {sendAddUserRequest} from "./relatedFunctions/sendAddUserRequest";
import {linkForAddingUser} from "../../../config";
import Snackbar from "@material-ui/core/Snackbar";

interface IAddUserModal {
    onChange: () => void,
    roomId: string
}


class AddUserModal extends React.Component<IAddUserModal> {
    state = {
        isOpen: false,
        userEmail: "",
        isError: false,
        errorMessage: ""
    }

    addUserHandler = () => {
        if (!this.state.userEmail) {
            this.setState({
                errorMessage: 'Email required',
                isError: true
            })
            return
        }
        sendAddUserRequest(this.state.userEmail, this.props.roomId)
            .then((response: Response) => {
                if (!response.ok) {
                    this.setState({
                        errorMessage: 'User not found',
                        isError: true
                    })
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
        const {isOpen, isError, errorMessage} = this.state


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
                            Here u can add new user.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            label="Email"
                            type="user email"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({userEmail: e.target.value})}
                        />
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Invite link"
                            value={linkForAddingUser+this.props.roomId}
                            variant="filled"
                            fullWidth
                        />
                        <DialogContentText style={{textAlign: "center"}}>
                            Or you can just share this link to your friends
                        </DialogContentText>
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