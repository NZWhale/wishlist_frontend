import React from "react";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Button, CircularProgress, IconButton, TextField} from "@material-ui/core";
import {sendRecoveryCode} from "./sendRecoveryCode";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from '@material-ui/core/Snackbar';
import InputMask from 'react-input-mask';
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";


class RecoveryCodeConfirmationPage extends React.Component<RouteComponentProps> {
    state = {
        isLoading: false,
        isAuthorised: false,
        isError: false,
        errorMessage: "",
        recoveryCode: ""
    }

    render() {
        const {isLoading, isError, errorMessage} = this.state
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
                <TextField
                    required
                    label="Recovery code"
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                        this.setState({recoveryCode: e.target.value})
                    }}
                />
                <Button
                    onClick={() => {
                        this.setState({isLoading: true})
                        console.log(this.state.recoveryCode)
                        sendRecoveryCode(this.state.recoveryCode)
                            .then((response: Response) => {
                                if(response.status === 500) {
                                    this.setState({
                                        isError: true,
                                        errorMessage: "Recovery code is broken"
                                    })
                                    //delay for beauty
                                    setTimeout(() => {
                                        this.setState({
                                            isError: false,
                                            isLoading: false
                                        })
                                    }, 3000)
                                }
                                if(response.status === 200){
                                    //delay for beauty
                                    setTimeout(() => {
                                        this.props.history.push('/newpassword')
                                    }, 1500)
                                }
                            })
                    }}
                >
                    Send
                </Button>
            </AlignCenter>
        )
    }
}

export default withRouter(RecoveryCodeConfirmationPage)