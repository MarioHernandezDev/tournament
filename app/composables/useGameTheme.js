/**
 * Clases Tailwind reutilizables por acento de juego.
 * Las clases se escriben completas (no interpoladas) para que el JIT de Tailwind las detecte.
 */
const THEMES = {
  red: {
    text: 'text-red-500',
    textSoft: 'text-red-400',
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-500',
    bgSoft: 'bg-red-500/10',
    bgSolidText: 'text-white',
    border: 'border-red-500/40',
    borderHover: 'hover:border-red-500/70',
    ring: 'ring-red-500/40',
    glow: 'shadow-red-600/25',
    dropShadow: 'drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]',
    dot: 'bg-red-500'
  },
  blue: {
    text: 'text-cyan-400',
    textSoft: 'text-cyan-300',
    bg: 'bg-cyan-400',
    bgHover: 'hover:bg-cyan-300',
    bgSoft: 'bg-cyan-400/10',
    bgSolidText: 'text-black',
    border: 'border-cyan-400/40',
    borderHover: 'hover:border-cyan-400/70',
    ring: 'ring-cyan-400/40',
    glow: 'shadow-cyan-400/25',
    dropShadow: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    dot: 'bg-cyan-400'
  },
  gold: {
    text: 'text-amber-400',
    textSoft: 'text-amber-300',
    bg: 'bg-amber-400',
    bgHover: 'hover:bg-amber-300',
    bgSoft: 'bg-amber-400/10',
    bgSolidText: 'text-black',
    border: 'border-amber-400/40',
    borderHover: 'hover:border-amber-400/70',
    ring: 'ring-amber-400/40',
    glow: 'shadow-amber-400/25',
    dropShadow: 'drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]',
    dot: 'bg-amber-400'
  }
}

export const useGameTheme = (theme) => THEMES[theme] || THEMES.red
