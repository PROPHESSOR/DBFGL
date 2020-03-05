import Wad from './wad';

const wad = new Wad({
    path:     '/home/prophessor/doom/wads/doom2.wad',
    name:     'doom2.wad',
    selected: false,
});

describe('doom2.wad with linux path', () => {
    test('should be a wad', () => {
        expect(wad.isWad).toBe(true);
    });

    test('should not be a pk3', () => {
        expect(wad.isPk3).toBe(false);
    });

    test('should not be a pk7', () => {
        expect(wad.isPk7).toBe(false);
    });

    test('should not be a pk*', () => {
        expect(wad.isPk).toBe(false);
    });

    test('should be an iwad', () => {
        expect(wad.isIWad).toBe(true);
    });

    test('should return a "wad" extension', () => {
        expect(wad.extension).toBe('wad');
    });

    test('folder validation', () => {
        expect(wad.folder).toBe('/home/prophessor/doom/wads/');
    });

    test('should return "doom2" cover image name', () => {
        expect(Wad.getIWADcoverName(wad.name)).toBe('doom2');
    });
});
