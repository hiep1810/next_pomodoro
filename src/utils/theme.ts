export const bgClassMap = {
  pomodoro: 'bg-[#ba4949]',
  shortBreak: 'bg-[#38858a]',
  longBreak: 'bg-[#397097]'
} as const

export type PomodoroMode = keyof typeof bgClassMap 