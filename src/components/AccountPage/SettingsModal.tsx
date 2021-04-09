import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import {DialogContentText} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {getUsernameUrl, userLink} from "../../config";
import {setUsernameRequest} from "./setUsernameRequest";


class SettingsModal extends React.Component {
    state = {
        username: "",
        isOpen: false
    }

    componentDidMount() {
        this.getUsernameHandler()
    }

    setUsernameHandler = () => {
        setUsernameRequest(this.state.username)
            .then((response: Response) => {
                if (response.status === 200) {
                    this.setState({isOpen: false});
                }
            })
            .catch((err: Error) => {
                alert(err)
                this.setState({isOpen: false});
            })
    }

    getUsernameHandler = () => {
        fetch(getUsernameUrl, {
            method: 'GET',
            credentials: "include"
        })
            .then((response: Response) => response.text())
            .then((data: string) => {
                this.setState({username: data})
            })
            .catch((err: Error) => console.log(err))
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
            <div>
                <IconButton edge="end" aria-label="settings" onClick={this.handleClickOpen}>
                    <SettingsIcon/>
                </IconButton>
                <Dialog open={isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogContentText>
                            If u wanna share your public wishes, you should set a username.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Username"
                            defaultValue={this.state.username}
                            type="title"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({username: e.target.value})}
                        />
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Your link"
                            defaultValue={userLink+this.state.username}
                            variant="filled"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            // this.props.onChange()
                            this.handleClose()
                        }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={async () => {
                            await this.setUsernameHandler()
                            // this.props.onChange()
                        }} color="primary">

                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default SettingsModal