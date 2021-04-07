import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import LockIcon from '@material-ui/icons/Lock';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import React from "react";
import {sendDeleteRequest} from "./sendDeleteRequest";
import EditWishModal from "./EditWishModal";

interface ISingleWishProps {
    wishTitle: string,
    wishDescription: string,
    wishId: string,
    isPublic: boolean,
    key: number,
    onChange: () => void
}

class SingleWish extends React.Component<ISingleWishProps> {

    deleteWish = () => {
        sendDeleteRequest(this.props.wishId)
            .catch((err: Error) => alert(err))
    }

    render() {
        const {wishTitle, wishDescription, wishId, isPublic} = this.props
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon color="primary"/>
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
                                       onChange={() => this.props.onChange()}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                onClick={async () => {
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