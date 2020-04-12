import React from 'react';
import types from 'prop-types';
import Section from '@/containers/Settings/Section';
import { TextField, Toggle, DropDownMenu, MenuItem } from 'material-ui';


class SPort extends React.PureComponent {
    static propTypes = {
        port:     types.object.isRequired,
        onChange: types.func.isRequired, // (diff): void
    }

    constructor(props) {
        super(props);

        const { port } = props;

        this.state = {
            name:                    port.name,
            description:             port.description,
            path:                    port.path,
            argformat:               port.argformat,
            supportPk3:              port.supportPk3,
            supportPk7:              port.supportPk7,
            supportZandronumServers: port.supportZandronumServers,
        };
    }

    change = diff => {
        this.setState(diff);
        this.props.onChange(diff);
    }

    onPathChange = (_, path) => this.change({ path });
    onArgFormatChange = (_, __, argformat) => this.change({ argformat });
    onSupportPk3Change = (_, supportPk3) => this.change({ supportPk3 });
    onSupportPk7Change = (_, supportPk7) => this.change({ supportPk7 });
    onSupportZandronumServersChange = (_, supportZandronumServers) => this.change({ supportZandronumServers });

    render() {
        const { name, path, argformat,
            supportPk3, supportPk7,
            supportZandronumServers } = this.state;

        const argformatjson = require('../../../../../declarations/argformat.json');

        delete argformatjson.default;

        const argformats = Object.keys(argformatjson).map(format => <MenuItem key={format} value={format} primaryText={format} />);

        return (<Section
            subtitle={`Настройка порта ${name}`}
            title={name}>
            <div>
                <TextField
                    floatingLabelText='Путь к бинарнику порта'
                    floatingLabelStyle={{ color: 'white' }} // FIXME:
                    value={path}
                    onChange={this.onPathChange}
                />
                <MenuItem>
                    Формат аргументов командной строки:
                    <DropDownMenu
                        value={argformat}
                        onChange={this.onArgFormatChange}>
                        {argformats}
                    </DropDownMenu>
                </MenuItem>
                <Toggle
                    label='Поддержка pk3'
                    name='pk3'
                    value={supportPk3}
                    onChange={this.onSupportPk3Change}
                />
                <Toggle
                    label='Поддержка pk7'
                    name='pk7'
                    value={supportPk7}
                    onChange={this.onSupportPk7Change}
                />
                <Toggle
                    label='Поддержка Zandronum серверов'
                    name='zandronum'
                    value={supportZandronumServers}
                    onChange={this.onSupportZandronumServersChange}
                />
            </div>
        </Section>);
    }
}

export default SPort;
