import React from "react";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import {sendAuthoriseRequest} from "./sendAuthoriseRequest";

class AuthorisePage extends React.Component<RouteComponentProps> {
    state = {
        isRequestComplete: false
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token')
        if (!token) {
            throw new Error("token doesn't exist")
        }
        sendAuthoriseRequest(token)
            .then((res) => {
                console.log(res)
                setTimeout(() => this.setState({isRequestComplete: true}), 1500)
            })
            .catch((e) => {
                console.log(e)
                this.setState({isRequestComplete: true})
            })
    }

    render() {
        const {isRequestComplete} = this.state
        return (
            <>
                {!isRequestComplete &&
                <>
                    <CircularProgress
                        style={{marginTop: "293px"}}
                    />
                </>
                }
            </>
        )
    }

}

export default withRouter(AuthorisePage)