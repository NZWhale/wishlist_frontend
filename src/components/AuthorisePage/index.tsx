import React from 'react';
import {Button, TextField, CircularProgress, Divider} from "@material-ui/core";
import {Component} from "react";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from "@material-ui/core/Snackbar";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Cookies from "js-cookie";
import AuthoriseViaMagicCodePage from "./AuthoriseViaMagicCode";
import {sendAuthorisationViaPasswordRequest} from "./sendAuthorisationViaPasswordRequest";


class AuthorisePage extends Component<RouteComponentProps> {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        email: "",
        password: "",
        emailAuthoriseClicked: false,
        cookie: Cookies.get('auth-token')
    }

    componentDidMount() {
        if(this.state.cookie){
            this.props.history.push("/account")
        }
    }

    render() {
        const {isLoading, email, password, emailAuthoriseClicked, isError, errorMessage} = this.state

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
                    />
                </>
            )
        }

        if(emailAuthoriseClicked){
            return (
                <>
                    <AuthoriseViaMagicCodePage/>
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
                        color="secondary"
                        onClick={() => this.props.history.push('/registration')}
                >
                    Sign Up
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
                    style={{margin: "12px"}}
                    required
                    label="Password"
                    placeholder="enter your password"
                    variant="outlined"
                    type="password"
                    size="small"
                    onChange={(e) => {
                        this.setState({password: e.target.value})
                    }}
                />
                <Button
                    onClick={() => {
                        this.setState({isLoading: true})
                        sendAuthorisationViaPasswordRequest(email.trim(), password)
                            .then((response) => {
                                if(!response.ok){
                                    this.setState({
                                        isLoading: false,
                                        errorMessage: "Email or password is incorrect",
                                        isError: true})
                                    //Delay for reading error message
                                    setTimeout(() => {
                                        this.setState({isError: false})
                                    }, 2000)
                                    return
                                }
                                this.setState({
                                    isLoading: false,
                                    errorMessage: "Ok, you will redirect",
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
                    log in
                </Button>
                <Divider style={{height: "2px", width: "80%", margin: "12px"}}/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({emailAuthoriseClicked: true})}
                >
                    or just via email
                </Button>
            </div>
            </>
        )
    }
}

export default withRouter(AuthorisePage);