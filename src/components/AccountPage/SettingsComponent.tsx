import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import {getUsernameUrl, userLink} from "../../config";
import {sendSetUsernameRequest} from "../relatedFunctions/sendSetUsernameRequest";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {deleteCookie} from "../relatedFunctions/deleteCookie";
import {deleteCookieRequest} from "../relatedFunctions/sendDeleteCookieRequest";


interface ISettingsComponentProps {
    onChange: () => void
}

class SettingsComponent extends React.Component<ISettingsComponentProps> {
    state = {
        username: "",
        newUsername: "",
        isOpen: false,
        isError: false,
        errorMessage: ""
    }

    async componentDidMount() {
        const username = await this.getUsername()
        this.setState({username: username})
    }

    setUsernameHandler = () => {
        sendSetUsernameRequest(this.state.newUsername)
            .then((response: Response) => {
                if (!response.ok) {
                    this.setState({
                        isError: true,
                        errorMessage: "Username is busy"
                    })
                    // Delay for reading error message
                    setTimeout(() => {
                        this.setState({isError: false})
                    }, 3000)
                    return
                }
                this.setState({
                    isError: true,
                    errorMessage: "Username set successful"
                })
                this.componentDidMount()
                // Delay for reading error message
                setTimeout(() => {
                    this.setState({isError: false})
                }, 3000)
            })
    }

    getUsername = () => {
        return fetch(getUsernameUrl, {
            method: 'GET',
            credentials: "include"
        })
            .then((response: Response) => {
                if (!response.ok) {
                    this.setState({
                        isError: true,
                        errorMessage: "You dont have username"
                    })
                    // Delay for reading error message
                    setTimeout(() => {
                        this.setState({isError: false})
                    }, 1000)
                    return
                }
                return response.text()
            })
    }

    render() {
        const {isError, errorMessage} = this.state

        return (
            <>
                {isError &&
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={isError}
                    onClose={() => this.setState({isError: false})}
                    message={errorMessage}
                />
                }
                <AppBar
                    position="static"
                    color="primary"
                >
                    <Toolbar style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Typography variant="h6" style={{
                            margin: 8,
                            justifyContent: "space-between",
                            display: "flex"
                        }}>
                            Settings
                        </Typography>
                        <div style={{display: "flex"}}>
                            <IconButton
                                style={{padding: 0}}
                                onClick={() => {
                                deleteCookie()
                                deleteCookieRequest()
                                this.props.onChange()
                            }}>
                                <ExitToAppIcon />
                            </IconButton>
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
                    <div style={{paddingLeft: "12px", paddingRight: "12px"}}>
                        If u wanna share your public wishes, you should set a username.
                    </div>
                    <div style={{paddingLeft: "12px", paddingRight: "12px"}}>
                        <TextField
                            margin="dense"
                            label="Username"
                            placeholder={this.state.username}
                            type="title"
                            fullWidth
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({newUsername: e.target.value})}
                        />
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Your link"
                            value={this.state.username?userLink + this.state.username:userLink}
                            variant="filled"
                            //TODO: it doesn't work on HTTP, should research on alt method to clipboard copy
                            // onClick={() => {
                            //     navigator.clipboard.writeText(this.state.username?userLink + this.state.username:userLink)
                            //         .then(() => {
                            //             this.setState({
                            //                 errorMessage: 'Link copied',
                            //                 isError: true
                            //             })
                            //             setTimeout(() => {
                            //                 this.setState({
                            //                     errorMessage: '',
                            //                     isError: false
                            //                 })
                            //             }, 1500)
                            //         })
                            //         .catch(() => {
                            //             this.setState({
                            //                 errorMessage: "Something goes wrong. link isn't copied",
                            //                 isError: true
                            //             })
                            //             setTimeout(() => {
                            //                 this.setState({
                            //                     errorMessage: '',
                            //                     isError: false
                            //                 })
                            //             }, 1500)
                            //         })
                            // }}
                            fullWidth
                        />
                    </div>
                    <div style={{marginTop: "24px"}}>
                        <Button onClick={async () => {
                            await this.setUsernameHandler()
                        }} color="primary">

                            Save
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default SettingsComponent