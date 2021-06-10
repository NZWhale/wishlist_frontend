import React from "react";
import {Button, CircularProgress, IconButton, TextField} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AlignCenter from "../../reusableComponents/AlignCenter";
import {sendSetPasswordRequest} from "./sendSetPasswordRequest";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";


class SetNewPasswordComponent extends React.Component<RouteComponentProps> {
    state = {
        password: "",
        isPasswordsMatch: false,
        isLoading: false,
        isError: false,
        errorMessage: ""
    }
    render() {
        const {password, isError, isPasswordsMatch, isLoading, errorMessage} = this.state

        if (isError) {
            return (
                <>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={isError}
                        onClose={() => this.setState({isError: false})}
                        message={errorMessage}
                    />
                </>
            )
        }
        if (isLoading) {
            return (
                <>
                    <AlignCenter>
                        <CircularProgress/>
                    </AlignCenter>
                </>
            )
        }

        return (
            <AlignCenter>
                <IconButton
                    onClick={() => this.props.history.push('/login')}
                    color="secondary"
                >
                    <KeyboardBackspaceIcon>Back</KeyboardBackspaceIcon>
                </IconButton>
                <TextField required
                           label="New password"
                           variant="outlined"
                           size="small"
                           type="password"
                           onChange={(e) => {
                               this.setState({password: e.target.value})
                           }}
                />
                <TextField required
                           label="Repeat"
                           variant="outlined"
                           size="small"
                           type="password"
                           error={!this.state.isPasswordsMatch}
                           onChange={(e) => {
                               if (e.target.value === password) {
                                   this.setState({isPasswordsMatch: true})
                               } else {
                                   this.setState({isPasswordsMatch: false})
                               }
                           }}
                />
                <Button
                    disabled={!isPasswordsMatch}
                    onClick={() => {
                        this.setState({isLoading: true})
                        sendSetPasswordRequest(password)
                            .then((response) => {
                                if (!response.ok) {
                                    this.setState({
                                        isLoading: false,
                                        errorMessage: "Email doesn't pass validation",
                                        isError: true,
                                        password: ""
                                    })
                                    //Delay for reading error message
                                    setTimeout(() => {
                                        this.setState({isError: false})
                                    }, 3000)
                                    return
                                }
                                this.setState({
                                    isLoading: false,
                                    errorMessage: "Check your email",
                                    isError: true
                                })
                                //Delay for reading error message
                                setTimeout(() => {
                                    this.setState({isError: false})
                                    this.props.history.push('/account')
                                }, 1500)
                            })
                    }}
                        >
                    Save
                </Button>
            </AlignCenter>
        )
    }
}

export default withRouter(SetNewPasswordComponent)