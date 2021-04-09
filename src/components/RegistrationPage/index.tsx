import React from 'react';
import {Button, TextField, CircularProgress} from "@material-ui/core";
import {Component} from "react";
import {sendRegistrationRequest} from "./sendRegistrationRequest";
import AlignCenter from "../../reusableComponents/AlignCenter";

export interface IState {
    isLoading: boolean,
    email: string
}

class RegistrationPage extends Component {
    state: IState = {
        isLoading: false,
        email: ""
    }

    render() {
        const {isLoading, email} = this.state

        if (isLoading) {
            return (
                <AlignCenter>
                    <CircularProgress />
                </AlignCenter>
            );
        }

        return (
            <AlignCenter>
                <TextField
                    required
                    id="outlined-required"
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
                    onClick={() => {
                        this.setState({isLoading: true})
                        sendRegistrationRequest(email)
                            .then(() => {
                                this.setState({isLoading: false})
                                alert("Check your email")
                            })
                            .catch((e) => {
                                this.setState({isLoading: false})
                                alert(e)
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
