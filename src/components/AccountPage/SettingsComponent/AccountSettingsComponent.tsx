import AlignCenter from "../../../reusableComponents/AlignCenter";
import {Button, TextField, Typography} from "@material-ui/core";
import React from "react";

class AccountSettingsComponent extends React.Component {
    state = {
        isLoading: false,
        isError: false,
        errorMessage: "",
        password: "",
        isPasswordsMatch: false,
    }

    render() {
        const {password} = this.state
        return (
            <AlignCenter>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography  variant="body2" color="textSecondary">
                        Set new password. <br/>
                        Use this link if no password has been set yet
                    </Typography>
                    <TextField
                        required
                        style={{margin: "12px"}}
                        label="Old password"
                        placeholder="enter your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        onChange={(e) => {
                            this.setState({password: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        style={{margin: "12px"}}
                        label="New password"
                        placeholder="enter your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        onChange={(e) => {
                            this.setState({password: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        label="Repeat"
                        placeholder="repeat your password"
                        variant="outlined"
                        type="password"
                        size="small"
                        style={{marginBottom: "12px"}}
                        // error={!this.state.isPasswordsMatch}
                        onChange={(e) => {
                            if (e.target.value === password) {
                                this.setState({isPasswordsMatch: true})
                            } else {
                                this.setState({isPasswordsMatch: false})
                            }
                        }}
                    />
                    <Button
                        // disabled={!isPasswordsMatch}
                        onClick={() => {
                            this.setState({isLoading: true})
                        }}
                    >
                        Change password
                    </Button>
                </div>
            </AlignCenter>
        )
    }
}

export default AccountSettingsComponent