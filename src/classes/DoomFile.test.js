import DoomFile from './DoomFile';

const wad = new DoomFile({
    path: '/home/prophessor/doom/wads/doom2.wad',
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

    test('should have a name "doom2.wad"', () => {
        expect(wad.name).toBe('doom2.wad');
    });

    test('should be an iwad', () => {
        expect(wad.isIWad).toBe(true);
    });

    test('should be unselected', () => {
        expect(wad.selected).toBe(false);
    });

    test('should return a "wad" extension', () => {
        expect(wad.extension).toBe('wad');
    });

    test('folder validation', () => {
        expect(wad.folder).toBe('/home/prophessor/doom/wads/');
    });

    test('should return "doom2" cover image name', () => {
        expect(DoomFile.getIWADcoverName(wad.name)).toBe('doom2');
    });
});
