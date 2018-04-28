import argformats from '../../../declarations/argformat.json';

class Port {
    constructor ({ name = 'Unknown port', description = '', path = null, argformat = 'gzdoom' }) {
        if (!path) {
            throw new Error('У порта должен быть путь для запуска!');
        }
        this.name = name;
        this.description = description;
        this.path = path;
        this.argformat = argformats[argformat] || argformats.default || null;
    }
}

export default Port;
