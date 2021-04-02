import React from 'react';
import {Button, TextField, CircularProgress} from "@material-ui/core";
import {Component} from "react";
import {sendRegistrationRequest} from "./sendRegistrationRequest";

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
        return (
            <>
                {!isLoading &&
                <>
                    <TextField
                        style={{marginTop: "100%"}}
                        required
                        id="outlined-required"
                        label="Email"
                        // fullWidth
                        placeholder="your@email.com"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {this.setState({email: e.target.value})}}
                    />
                    <Button
                        style={{marginTop: "100%", height: "40px"}}
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
                </>
                }
                {isLoading &&
                <CircularProgress
                    style={{marginTop: "293px"}}
                />
                }
            </>
        )
    }
}

export default RegistrationPage;
