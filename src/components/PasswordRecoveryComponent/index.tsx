import React from 'react'
import {Button, IconButton, TextField} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {sendRecoveryRequest} from "../relatedFunctions/sendRecoveryRequest";

class PasswordRecoveryComponent extends React.Component<RouteComponentProps> {
    state = {
        email: ""
    }
    render() {
        return (
            <>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                }}>
                    <IconButton
                            onClick={() => this.props.history.push('/login')}
                            color="secondary"
                    >
                        <KeyboardBackspaceIcon>Back</KeyboardBackspaceIcon>
                    </IconButton>
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
                        style={{margin: "12px"}}
                        label="Email"
                        placeholder="your@email.com"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                            this.setState({email: e.target.value})
                        }}
                    />
                    <Button
                        color="primary"
                        onClick={() => {
                            sendRecoveryRequest(this.state.email)
                                .then((response) => {
                                    if(!response.ok){
                                        alert('something goes wrong')
                                        return
                                    }
                                    alert('check your email')
                                    this.props.history.push('/recoverycode')
                                })
                        }}
                    >
                        Send instructions
                    </Button>
                </div>
            </>
        )
    }
}

export default withRouter(PasswordRecoveryComponent)