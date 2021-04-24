import React from "react";
import AlignCenter from "../../../reusableComponents/AlignCenter";
import {CircularProgress} from "@material-ui/core";
import Cookies from "js-cookie";
import {sendAddUserViaLinkRequest} from "./relatedFunctions/AddUserViaLinkRequest";
import {match, RouteComponentProps, withRouter} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";


interface MyParams {
    roomId: string
}

class AddUserViaLinkPage extends React.Component<RouteComponentProps>{
    state = {
        isLoaded: false,
        isError: false,
        errorMessage: "",
        cookie: Cookies.get('auth-token')
    }


    componentDidMount() {
        const myMatch = this.props.match as match<MyParams>
        const {roomId} = myMatch.params

        if(!this.state.cookie){
            this.setState({isError: true})
            this.setState({errorMessage: "You should login before enter the room. You will redirect to auth page"})
            //Delay for beauty
            setTimeout(() => {
                this.setState({isError: false})
                this.setState({isLoaded: true})
                this.props.history.push({
                    pathname: '/registration',
                    state: {
                        from: this.props.location.pathname
                    }
                })
            }, 3000)
            return
        }
        sendAddUserViaLinkRequest(roomId)
            .then((response: Response) => {
                if (!response.ok) {
                    this.setState({isError: true})
                    this.setState({errorMessage: "Can't add to the room, you will redirect."})
                    //Delay for beauty
                    setTimeout(() => {
                        this.setState({isError: false})
                        this.setState({isLoaded: true})
                        this.props.history.push('/account')
                    }, 2000)
                    return
                }
                this.setState({isError: true})
                this.setState({errorMessage: "You successfully added to the room"})
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

export default withRouter(AddUserViaLinkPage)