import React from 'react';
import {Button, TextField, CircularProgress} from "@material-ui/core";
import {Component} from "react";
import {sendRegistrationRequest} from "./sendRegistrationRequest";
import AlignCenter from "../../../reusableComponents/AlignCenter";
import Snackbar from "@material-ui/core/Snackbar";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Cookies from "js-cookie";

interface ILocationState {
    from: string
}

class AuthoriseViaMagicCodePage extends Component<RouteComponentProps> {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        email: "",
        cookie: Cookies.get('auth-token')
    }

    componentDidMount() {
        if(this.state.cookie){
            this.props.history.push("/account")
        }
    }

    render() {
        const {isLoading, email, isError, errorMessage} = this.state
        const locationState = this.props.location.state as ILocationState

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

        return (
            <AlignCenter>
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
                <Button
                    onClick={() => {
                        this.setState({isLoading: true})
                        sendRegistrationRequest(email.trim())
                            .then((response) => {
                                if(!response.ok){
                                    this.setState({
                                        isLoading: false,
                                        errorMessage: "Email doesn't pass validation",
                                        isError: true})
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
                                    if(locationState){
                                        this.props.history.push({
                                            pathname: '/codeConfirmationPage',
                                            state: {
                                                from: locationState.from
                                            }
                                        })
                                        return
                                    }
                                    this.props.history.push('/codeConfirmationPage')
                                }, 1500)
                            })
                    }}
                >
                    Send
                </Button>
            </AlignCenter>
        )
    }
}

export default withRouter(AuthoriseViaMagicCodePage);
