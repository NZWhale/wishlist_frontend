import React from "react";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import {sendAuthoriseRequest} from "./sendAuthoriseRequest";
import AlignCenter from "../../reusableComponents/AlignCenter";
import AccountPage from "../AccountPage";

class AuthorisePage extends React.Component<RouteComponentProps> {
    state = {
        isRequestComplete: false,
        isAuthorised: false
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token')
        if (!token) {
            throw new Error("token doesn't exist")
        }
        sendAuthoriseRequest(token)
            .then(() => {
                setTimeout(() => {
                    this.setState({isRequestComplete: true})
                    this.setState({isAuthorised: true})
                }, 1500)
            })
            .catch((e) => {
                setTimeout(() => {
                    this.setState({isRequestComplete: true})
                    alert(e)
                }, 1500)

            })
    }

    render() {
        const {isRequestComplete, isAuthorised} = this.state
        if(isAuthorised){
            return (
                <AccountPage />
            )
        }
        return (
            <>
                {!isRequestComplete &&
                <AlignCenter>
                    <CircularProgress/>
                </AlignCenter>
                }
            </>
        )
    }
}

export default withRouter(AuthorisePage)