import React from "react";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import {sendAuthoriseRequest} from "./sendAuthoriseRequest";
import AlignCenter from "../../reusableComponents/AlignCenter";
import Snackbar from '@material-ui/core/Snackbar';

class AuthorisePage extends React.Component<RouteComponentProps> {
    state = {
        isRequestComplete: false,
        isAuthorised: false,
        isError: false,
        errorMessage: ""
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token')
        if (!token) {
            this.setState({isError: true})
            this.setState({errorMessage: "Token doesn't exist"})
            console.log(this.state)
            throw new Error("Token doesn't exist")
        }
        sendAuthoriseRequest(token)
            .then((response: Response) => {
                if(response.status === 500) {
                    this.setState({isError: true})
                    this.setState({errorMessage: "Token doesn't exist, you will redirect to auth page"})
                    setTimeout(() => {
                        this.setState({isRequestComplete: true})
                        this.props.history.push('/registration')
                    }, 3000)
                }
                if(response.status === 200){
                setTimeout(() => {
                    this.props.history.push('/account')
                }, 1500)
                }
            })
    }

    render() {
        const {isRequestComplete, isError, errorMessage} = this.state
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
        if (!isRequestComplete) {
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

export default withRouter(AuthorisePage)