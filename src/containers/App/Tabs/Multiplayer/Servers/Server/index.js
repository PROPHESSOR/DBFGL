import React, { Component } from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import { /* List, */ ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ContentSend from 'material-ui/svg-icons/content/send';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import Divider from 'material-ui/Divider';
// import ActionInfo from 'material-ui/svg-icons/action/info';

export default class Servers extends Component {
    render () {
        return <ListItem leftIcon = { <ContentInbox /> } primaryText = 'Inbox' />;
    }
}
