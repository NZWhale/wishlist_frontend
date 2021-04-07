import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {FormControlLabel, Switch} from "@material-ui/core";
import {sendAddWishRequest} from "./sendAddWishRequest";
import {IWishRow} from "../../interfaces";

interface IFormDialog {
    onChange: ({}: IWishRow) => void
}


class FormDialog extends React.Component<IFormDialog> {
    state = {
        isOpen: false,
        isPublic: true,
        title: "",
        description: "",
    }

    addWishHandler = () => {
        if(!this.state.title){
            alert('Title required')
            return
        }
        if(!this.state.description){
            alert('Description required')
            return
        }
        sendAddWishRequest(this.state.title, this.state.description, this.state.isPublic)
            .then((response: Response) => {
                if(response.status === 200) {
                    alert('Wish added successful')
                    this.setState({isOpen: false});
                    this.props.onChange({title: this.state.title, description: this.state.description, isPublic: this.state.isPublic})
                }
            })
            .catch((err: Error) => {
                alert(err)
                this.setState({isOpen: false});
            })
    }

    render() {
        const {isOpen, isPublic} = this.state

        const handleClickOpen = () => {
            this.setState({isOpen: true});
        };

        const handleClose = () => {
            this.setState({isOpen: false});
        };

        const toggleChecked = () => {
            this.setState({isPublic: !isPublic})
        }



        return (
            <div>
                <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                    <AddBoxIcon/>
                </IconButton>
                <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
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
                                                           onChange={toggleChecked}/>} label={"Public"}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
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

export default FormDialog