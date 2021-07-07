import React from "react";
import {withRouter, RouteComponentProps, match} from 'react-router-dom';
import {Button, CircularProgress, IconButton, TextField} from "@material-ui/core";
import {sendRecoveryCode} from "./sendRecoveryCode";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from '@material-ui/core/Snackbar';
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

interface MyParams {
    recoveryCode: string
}

class RecoveryCodeConfirmationPage extends React.Component<RouteComponentProps> {
    state = {
        isLoading: true,
        isAuthorised: false,
        isError: false,
        errorMessage: "",
        recoveryCode: ""
    }

    componentDidMount() {
        const myMatch = this.props.match as match<MyParams>
        const {recoveryCode} = myMatch.params
        sendRecoveryCode(recoveryCode)
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
    }
}

export default withRouter(RecoveryCodeConfirmationPage)