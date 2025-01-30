export const themeMap = {
  pomodoro: {bg: 'bg-[#ba4949]', text: 'text-[#ba4949]'},
  shortBreak: {bg: 'bg-[#38858a]', text: 'text-[#38858a]'},
  longBreak: {bg: 'bg-[#397097]', text: 'text-[#397097]'}
} as const

export type PomodoroMode = keyof typeof themeMap 