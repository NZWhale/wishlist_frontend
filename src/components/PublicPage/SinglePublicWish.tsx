import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SubjectIcon from '@material-ui/icons/Subject';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

interface ISingleWishProps {
    wishTitle: string,
    wishDescription: string,
    key: number,
}

class SinglePublicWish extends React.Component<ISingleWishProps> {

    render() {
        const {wishTitle, wishDescription} = this.props
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
            </ListItem>
        );
    }
}

export default SinglePublicWish