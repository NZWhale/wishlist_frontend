import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {DialogContentText, FormControlLabel, Switch} from "@material-ui/core";
import {sendAddWishRequest} from "./sendAddWishRequest";

interface IFormDialog {
    onChange: () => void
}


class AddWishModal extends React.Component<IFormDialog> {
    state = {
        isOpen: false,
        isPublic: true,
        title: "",
        description: "",
    }

    addWishHandler = () => {
        if (!this.state.title) {
            alert('Title required')
            return
        }
        if (!this.state.description) {
            alert('Description required')
            return
        }
        sendAddWishRequest(this.state.title, this.state.description, this.state.isPublic)
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

    render() {
        const {isOpen, isPublic} = this.state
        return (
            <div>
                <IconButton edge="end" aria-label="add" onClick={this.handleClickOpen}>
                    <AddBoxIcon/>
                </IconButton>
                <Dialog open={isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogContentText style={{textAlign: "center"}}>
                            Here u can add new wishes.
                        </DialogContentText>
                        <TextField
                            autoFocus
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
            </div>
        );
    }
}

export default AddWishModal