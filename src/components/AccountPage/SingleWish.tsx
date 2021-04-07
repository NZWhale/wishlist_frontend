import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import LockIcon from '@material-ui/icons/Lock';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import React from "react";

interface ISingleWishProps {
    wishTitle: string,
    wishDescription: string,
    isPublic: boolean,
    key: number
}

class SingleWish extends React.Component<ISingleWishProps> {
    render() {
        const {wishTitle, wishDescription, isPublic} = this.props
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
                    <IconButton edge="start" aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default SingleWish