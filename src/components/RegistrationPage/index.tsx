import React from 'react';
import {Button, TextField, CircularProgress} from "@material-ui/core";
import {Component} from "react";
import {sendRegistrationRequest} from "./sendRegistrationRequest";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from "@material-ui/core/Snackbar";

class RegistrationPage extends Component {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        email: ""
    }

    render() {
        const {isLoading, email, isError, errorMessage} = this.state

        if (isLoading) {
            return (
                <AlignCenter>
                    <CircularProgress />
                </AlignCenter>
            );
        }

        if (isError) {
            return (
                <>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={isError}
                        onClose={() => this.setState({isError: false})}
                        message={errorMessage}
                        key={"top" + "center"}
                    />
                </>
            )
        }

        return (
            <AlignCenter>
                <TextField
                    required
                    label="Email"
                    // fullWidth
                    placeholder="your@email.com"
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                        this.setState({email: e.target.value})
                    }}
                />
                <Button
                    onClick={(e) => {
                        this.setState({isLoading: true})
                        sendRegistrationRequest(email)
                            .then(() => {
                                this.setState({isLoading: false})
                                this.setState({errorMessage: "Check your email"})
                                this.setState({isError: true})
                                //Delay for reading error message
                                setTimeout(() => {
                                    this.setState({isError: false})
                                }, 3000)
                            })
                            .catch((e) => {
                                this.setState({isLoading: false})
                                this.setState({errorMessage: e})
                                this.setState({isError: true})
                                //Delay for reading error message
                                setTimeout(() => {
                                    this.setState({isError: false})
                                }, 3000)
                            })
                    }}
                >
                    Send
                </Button>
            </AlignCenter>
        )
    }
}

export default RegistrationPage;
