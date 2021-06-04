import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import {AppBar, createStyles, IconButton, Tab, Toolbar, Typography, withStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import {deleteCookie} from "../../relatedFunctions/deleteCookie";
import {deleteCookieRequest} from "../../relatedFunctions/sendDeleteCookieRequest";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ProfileComponent from "./ProfileComponent";
import AccountSettingsComponent from "./AccountSettingsComponent";

interface ISettingsComponentProps {
    classes: any,
    onChange: () => void
}

interface StyledTabProps {
    label: string;
}

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

class SettingsComponent extends React.Component<ISettingsComponentProps> {
    state = {
        value: 0
    }

    render() {
        const {value} = this.state
        const {classes, onChange} = this.props
        const StyledTabs = withStyles({
            indicator: {
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                '& > span': {
                    maxWidth: 40,
                    width: '100%',
                    backgroundColor: '#3f51b5',
                },
            },
        })((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);
        const StyledTab = withStyles((theme: Theme) =>
            createStyles({
                root: {
                    textTransform: 'none',
                    color: '#3f51b5',
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: theme.typography.pxToRem(15),
                    marginRight: theme.spacing(1),
                    '&:focus': {
                        opacity: 1,
                    },
                },
            }),
        )((props: StyledTabProps) => <Tab disableRipple {...props} />);
        return (
            <>
                <AppBar
                    position="static"
                    color="primary"
                >
                    <Toolbar style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Typography variant="h6" style={{
                            margin: 8,
                            justifyContent: "space-between",
                            display: "flex"
                        }}>
                            Settings
                        </Typography>
                        <div style={{display: "flex"}}>
                            <IconButton
                                style={{padding: 0}}
                                onClick={() => {
                                    deleteCookie()
                                    deleteCookieRequest()
                                    this.props.onChange()
                                }}>
                                <ExitToAppIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>

                </AppBar>
                <div className={classes.demo2}>
                    <StyledTabs value={value} onChange={(e: any) => {
                        switch (e.target.innerText) {
                            case 'Profile':
                                this.setState({value: 0})
                                break
                            case 'Account':
                                this.setState({value: 1})
                                break
                        }
                    }} aria-label="styled tabs example">
                        <StyledTab label="Profile"/>
                        <StyledTab label="Account"/>
                    </StyledTabs>
                </div>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    {value===0 &&
                    <ProfileComponent onChange={onChange}/>
                    }
                    {value===1 &&
                    <AccountSettingsComponent />
                    }
                </div>
            </>
        )
    }
}

export default SettingsComponent