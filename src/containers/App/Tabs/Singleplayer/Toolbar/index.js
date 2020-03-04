import React from 'react';
import type from 'prop-types';

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Wad from '../WadController/wad/wad';

import Styles from './styles.scss';
import { getIWads } from '../WadController/getWadsFromFs';

export default class ToolbarSingleplayer extends React.Component {
    static propTypes = {
        iwads:    type.array.isRequired,
        showDrop: type.number.isRequired,
        sortDrop: type.number.isRequired,
        iwadDrop: type.string.isRequired,
        onChangeShow: type.func.isRequired,
        onChangeSort: type.func.isRequired,
        onChangeIwad: type.func.isRequired,
    }

    render() {
        const {
            iwads,
            showDrop, sortDrop, iwadDrop,
            onChangeShow, onChangeSort, onChangeIwad } = this.props;

        const iwadsJsx = iwads.map(iwad => <MenuItem primaryText={iwad.name} value={iwad.name} />);

        const iwadIcon = <img className={Styles['toolbar-iwad-dropdown-img']} src={Wad.getIWADcover(iwadDrop)} />;

        return (
            <Toolbar>
                <ToolbarGroup firstChild >
                    <DropDownMenu value={showDrop} onChange={onChangeShow}>
                        <MenuItem primaryText='Мои коллекции' value={0} />
                        <MenuItem primaryText='Все вады' value={1} />
                        <MenuItem primaryText='История' value={2} />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <RaisedButton primary label='Создать коллекцию' />
                    <ToolbarTitle text='Сортировка' />
                    <DropDownMenu value={sortDrop} onChange={onChangeSort}>
                        <MenuItem primaryText='по имени' value={0} />
                        <MenuItem primaryText='по дате' value={1} />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text='IWAD' style={{paddingRight: 0}} />
                    
                    <DropDownMenu value={iwadDrop} iconButton={iwadIcon} labelStyle={{visibility: 'hidden', width: 0}} onChange={onChangeIwad}>
                        {iwadsJsx}
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
