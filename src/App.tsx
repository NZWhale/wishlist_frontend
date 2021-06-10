import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Cookies from 'js-cookie'
import AuthorisePage from "./components/AuthorisePage";
import RegistrationPage from "./components/RegistrationPage/";
import AccountPage from "./components/AccountPage"
import PublicPage from "./components/PublicPage";
import AddUserViaLinkPage from "./components/AccountPage/RoomsPage/AddUserViaLinkPage";
import EmailConfirmationPage from "./components/EmailConfirmationPage";
import AuthoriseViaMagicCodePage from "./components/AuthorisePage/AuthoriseViaMagicCode";
import CodeConfirmationPage from "./components/CodeConfirmationPage";
import PasswordRecoveryComponent from "./components/PasswordRecoveryComponent";
import RecoveryCodeConfirmationPage from "./components/PasswordRecoveryComponent/RecoveryCodeConfirmationPage";
import SetNewPasswordComponent from "./components/PasswordRecoveryComponent/SetNewPasswordComponent";

class App extends React.Component {
    state = {
        cookie: Cookies.get('auth-token')
    }
    render() {
        const {cookie} = this.state
        return (
            <Router>
                <Switch>

                    <Route path="/confirmation/:confirmationCode">
                        <EmailConfirmationPage/>
                    </Route>
                    <Route path="/registration">
                        <RegistrationPage/>
                    </Route>
                    <Route path="/magicCodeAuth">
                        <AuthoriseViaMagicCodePage/>
                    </Route>
                    <Route path="/codeConfirmationPage">
                        <CodeConfirmationPage/>
                    </Route>
                    <Route path="/authorise">
                        <AuthorisePage/>
                    </Route>
                    <Route path="/account">
                        <AccountPage/>
                    </Route>
                    <Route path="/user/:username">
                        <PublicPage/>
                    </Route>
                    <Route path="/addUser/:roomId">
                        <AddUserViaLinkPage/>
                    </Route>
                    <Route path="/passwordrecovery">
                        <PasswordRecoveryComponent />
                    </Route>
                    <Route path="/recoverycode">
                        <RecoveryCodeConfirmationPage />
                    </Route>
                    <Route path='/newpassword'>
                        <SetNewPasswordComponent/>
                    </Route>
                    <Redirect from='/' to={cookie?'/account':'/authorise'}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
