import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import {FormControlLabel, Switch} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {sendEditWishRequest} from "./sendEditWishRequest";

interface IEditFormDialog {
    wishTitle: string,
    wishDescription: string,
    wishId: string,
    isPublic: boolean
    onChange: () => void
}


class EditWishModal extends React.Component<IEditFormDialog> {
    state = {
        isOpen: false,
        isPublic: this.props.isPublic,
        title: "",
        description: "",
    }

    editWishHandler = () => {
        sendEditWishRequest(this.props.wishId, this.state.title, this.state.description, this.state.isPublic)
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
                            placeholder={this.props.wishTitle}
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({title: e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="description"
                            placeholder={this.props.wishDescription}
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({description: e.target.value})}
                        />
                        <FormControlLabel style={{marginTop: "12px"}}
                                          control={<Switch size="small" color="primary" checked={isPublic}
                                                           onChange={this.toggleChecked}/>} label={"Public"}/>
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

                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditWishModal