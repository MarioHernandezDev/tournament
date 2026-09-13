/**
 * Configuración estática por juego: tema de color, icono y modos de juego.
 * `theme` referencia las claves usadas por useGameTheme().
 */
const GAMES = {
  lol: {
    id: 'lol',
    label: 'League of Legends',
    shortLabel: 'LoL',
    theme: 'blue',
    icon: 'i-simple-icons-leagueoflegends',
    modes: ['5v5 Grieta', 'ARAM', '1v1 Howling Abyss'],
    defaultBanner: '/img/lol-hero.png'
  },
  valorant: {
    id: 'valorant',
    label: 'Valorant',
    shortLabel: 'Valorant',
    theme: 'red',
    icon: 'i-simple-icons-valorant',
    modes: ['5v5 Competitivo', 'Swiftplay', '1v1 Aim Map'],
    defaultBanner: '/img/valorant-hero.png'
  }
}

export const useGameConfig = (game) => {
  return GAMES[game] || GAMES.lol
}

export const GAME_LIST = Object.values(GAMES)
