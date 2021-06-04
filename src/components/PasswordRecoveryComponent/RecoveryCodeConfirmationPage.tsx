import React from "react";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Button, CircularProgress, TextField} from "@material-ui/core";
import {sendRecoveryCode} from "./sendRecoveryCode";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from '@material-ui/core/Snackbar';
import InputMask from 'react-input-mask';

interface ILocationState {
    from: string
}

class RecoveryCodeConfirmationPage extends React.Component<RouteComponentProps> {
    state = {
        isLoading: false,
        isAuthorised: false,
        isError: false,
        errorMessage: "",
        token: ""
    }

    render() {
        const {isLoading, isError, errorMessage} = this.state
        const locationState = this.props.location.state as ILocationState
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
                <InputMask
                    mask="aaa-aaa"
                    disabled={false}
                    onChange={(e) => {
                        this.setState({token: e.target.value.toUpperCase()})
                    }}
                >
                    {() => <TextField required
                                      label="Recovery code"
                                      placeholder={"XXX-XXX"}
                                      variant="outlined"
                                      size="small"
                    />}
                </InputMask>
                <Button
                    onClick={() => {
                        this.setState({isLoading: true})
                        sendRecoveryCode(this.state.token)
                            .then((response: Response) => {
                                if(response.status === 500) {
                                    this.setState({
                                        isError: true,
                                        errorMessage: "Token doesn't exist, you will redirect to auth page"
                                    })
                                    //delay for beauty
                                    setTimeout(() => {
                                        this.setState({isRequestComplete: true})
                                        // this.props.history.push('/authorise')
                                    }, 3000)
                                }
                                if(response.status === 200){
                                    //delay for beauty
                                    setTimeout(() => {
                                        if(locationState){
                                            this.props.history.push(locationState.from)
                                            return
                                        }
                                        // this.props.history.push('/account')
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