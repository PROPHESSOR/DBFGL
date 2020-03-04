const root = 'public/assets/wadcovers';

const games = [
    'chex', 'chex2',
    'doom', 'doom2', 'doom64',
    'freedoom', 'freedoom2',
    'hacx', 'heretic', 'hexen',
    'plutonia', 'tnt',
    'strife',
];

const covers = {};

games.forEach(game => covers[game] = `${root}/${game}.jpg`);

export default covers;
