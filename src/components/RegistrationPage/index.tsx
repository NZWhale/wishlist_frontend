import React from 'react';
import {Button, TextField, CircularProgress} from "@material-ui/core";
import {Component} from "react";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from "@material-ui/core/Snackbar";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Cookies from "js-cookie";
import {sendRegistrationRequest} from "./sendRegistrationRequest";

interface ILocationState {
    from: string
}

class RegistrationPage extends Component<RouteComponentProps> {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        email: "",
        password: "",
        isPasswordsMatch: false,
        cookie: Cookies.get('auth-token')
    }

    componentDidMount() {
        if (this.state.cookie) {
            this.props.history.push("/account")
        }
    }

    registrationRequest(email: string, password: string, locationState: ILocationState) {
        sendRegistrationRequest(email.trim(), password)
            .then((response) => {
                if (!response.ok) {
                    this.setState({
                        isLoading: false,
                        errorMessage: "Email doesn't pass validation",
                        isError: true
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
                    if (locationState) {
                        this.props.history.push({
                            pathname: '/authorise',
                            state: {
                                from: locationState.from
                            }
                        })
                        return
                    }
                    this.props.history.push('/authorise')
                }, 1500)
            })
    }


    render() {
        const {isLoading, email, password, isError, errorMessage, isPasswordsMatch} = this.state
        const locationState = this.props.location.state as ILocationState

        if (isLoading) {
            return (
                <AlignCenter>
                    <CircularProgress/>
                </AlignCenter>
            );
        }

        if (isError) {
            return (
                <>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={isError}
                        onClose={() => this.setState({isError: false})}
                        message={errorMessage}
                    />
                </>
            )
        }

        return (
            <>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    margin: "24px"
                }}>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => this.props.history.push('/authorise')}
                    >
                        Log in
                    </Button>
                </div>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <TextField
                        required
                        label="Email"
                        placeholder="your@email.com"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                            this.setState({email: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        style={{margin: "12px"}}
                        label="Password"
                        placeholder="enter your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        onChange={(e) => {
                            this.setState({password: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        label="Repeat"
                        placeholder="repeat your password"
                        variant="outlined"
                        type="password"
                        size="small"
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
                            this.registrationRequest(email, password, locationState)
                        }}
                    >
                        Sign up
                    </Button>
                </div>
            </>
        )
    }
}

export default withRouter(RegistrationPage);
