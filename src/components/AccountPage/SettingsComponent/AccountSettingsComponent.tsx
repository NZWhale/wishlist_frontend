import {Button, TextField, Typography} from "@material-ui/core";
import React from "react";
import {sendChangePasswordRequest} from "../../relatedFunctions/sendChangePasswordRequest";
import Snackbar from "@material-ui/core/Snackbar";

class AccountSettingsComponent extends React.Component {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        oldPassword: "",
        newPassword: "",
        isPasswordsMatch: false,
    }

    changePassword() {
        sendChangePasswordRequest(this.state.oldPassword, this.state.newPassword)
            .then((response) => {
                if (!response.ok) {
                    this.setState({
                        isError: true,
                        errorMessage: "Old password is incorrect"
                    })
                    // Delay for reading error message
                    setTimeout(() => {
                        this.setState({isError: false})
                    }, 1500)
                    return
                }
                this.setState({
                    isError: true,
                    errorMessage: "Password successfully changed"
                })
                // Delay for reading error message
                setTimeout(() => {
                    this.setState({isError: false})
                }, 1500)
            })
    }

    render() {
        const {newPassword, isPasswordsMatch, isError, errorMessage} = this.state
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
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography variant="body2" color="textSecondary">
                        Set new password. <br/>
                        Use this link if no password has been set yet
                    </Typography>
                    <TextField
                        required
                        style={{margin: "12px"}}
                        label="Old password"
                        placeholder="enter your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        onChange={(e) => {
                            this.setState({oldPassword: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        style={{margin: "12px"}}
                        label="New password"
                        placeholder="enter your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        onChange={(e) => {
                            this.setState({newPassword: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        label="Repeat"
                        placeholder="repeat your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        style={{marginBottom: "12px"}}
                        error={!this.state.isPasswordsMatch}
                        onChange={(e) => {
                            if (e.target.value === newPassword) {
                                this.setState({isPasswordsMatch: true})
                            } else {
                                this.setState({isPasswordsMatch: false})
                            }
                        }}
                    />
                    <Button
                        disabled={!isPasswordsMatch}
                        onClick={async() => {
                            this.setState({isLoading: true})
                            await this.changePassword()
                        }}
                    >
                        Change password
                    </Button>
                </div>
            </>
        )
    }
}

export default AccountSettingsComponent