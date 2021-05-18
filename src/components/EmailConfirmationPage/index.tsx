import React from "react";
import {CircularProgress} from "@material-ui/core";
import {match, RouteComponentProps, withRouter} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import AlignCenter from "../../reusableComponents/AlignCenter"
import {sendEmailConfirmationRequest} from "./sendEmailConfirmationRequest";


interface MyParams {
    confirmationCode: string
}

class EmailConfirmationPage extends React.Component<RouteComponentProps>{
    state = {
        isLoaded: false,
        isError: false,
        errorMessage: "",
    }


    componentDidMount() {
        const myMatch = this.props.match as match<MyParams>
        const {confirmationCode} = myMatch.params

        sendEmailConfirmationRequest(confirmationCode)
            .then((response: Response) => {
                if (!response.ok) {
                    this.setState({isError: true})
                    this.setState({errorMessage: "Can't add to the room, you will redirect."})
                    //Delay for beauty
                    setTimeout(() => {
                        this.setState({isError: false})
                        this.setState({isLoaded: true})
                        this.props.history.push('/authorise')
                    }, 2000)
                    return
                }
                this.setState({isError: true})
                this.setState({errorMessage: "Email confirm successfully"})
                setTimeout(() => {
                    this.setState({isError: false})
                    this.setState({isLoaded: true})
                    this.props.history.push("/account")
                }, 2000)
            })
    }

    render() {
        const {isLoaded, errorMessage, isError} = this.state

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
                {!isLoaded &&
                <AlignCenter>
                    <CircularProgress/>
                </AlignCenter>
                }
            </>
        )
    }
}

export default withRouter(EmailConfirmationPage)