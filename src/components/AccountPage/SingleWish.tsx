import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SubjectIcon from '@material-ui/icons/Subject';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import LockIcon from '@material-ui/icons/Lock';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import React, {CSSProperties} from "react";
import {sendDeleteRequest} from "./relatedFunctions/sendDeleteRequest";
import EditWishModal from "./EditWishModal";
import {IRoomRow} from "../../interfaces";

interface ISingleWishProps {
    wishTitle: string,
    wishDescription: string,
    wishId: string,
    isPublic: boolean | string[],
    key: number,
    onChange: () => void,
    classes: any
    getStyles: (room: string, rooms: IRoomRow[]) => CSSProperties | undefined
}

class SingleWish extends React.Component<ISingleWishProps> {

    deleteWish = () => {
        sendDeleteRequest(this.props.wishId)
            .catch((err: Error) => alert(err))
    }

    render() {
        const {wishTitle, wishDescription, wishId, isPublic, classes, getStyles} = this.props
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <SubjectIcon color="primary"/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={wishTitle}
                    secondary={wishDescription}
                />
                {!isPublic &&
                <ListItemIcon style={{paddingRight: "15px"}}>
                    <LockIcon style={{width: "12px"}} color="disabled"/>
                </ListItemIcon>
                }
                <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <EditWishModal wishTitle={wishTitle} wishDescription={wishDescription} wishId={wishId}
                                       isPublic={isPublic}
                                       onChange={() => this.props.onChange()}
                                       getStyles={(room: string, rooms: IRoomRow[]) => getStyles(room, rooms)}
                                       classes={classes}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                onClick={async () => {
                                    if (!window.confirm('Are you sure?')) {
                                        this.props.onChange()
                                        return
                                    }
                                    await this.deleteWish()
                                    this.props.onChange()
                                }}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default SingleWish