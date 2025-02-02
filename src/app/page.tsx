'use client'

import { useState } from 'react'
import { Settings, BarChart2, MoreVertical, User, LogIn, Star, Keyboard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePomodoro } from '@/hooks/use-pomodoro'
import {PomodoroMode ,themeMap } from '@/utils/theme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskForm } from '@/components/task-form'
import { TaskItem } from '@/components/task-item'

interface Task {
  title: string
  estimatedPomodoros: number
  completedPomodoros: number
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<PomodoroMode>('pomodoro')
  const theme = themeMap[mode]
  const { time, isRunning, start, pause, reset } = usePomodoro()
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const handleModeChange = (value: string) => {
    setMode(value as PomodoroMode)
    reset()
  }

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task])
    console.log(tasks)
  }

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <header className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center" >
              <Check className={`h-4 w-4 stroke-[5] ${theme.text}`} />
            </div>
            <span className="text-white font-bold text-2xl">Pomofocus</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className={`text-white bg-[#ffffff]/10 ${theme.textHover}`}>
              <BarChart2 className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Report</span>
            </Button>
            <Button variant="ghost" className={`text-white bg-[#ffffff]/10 ${theme.textHover}`}>
              <Settings className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Setting</span>
            </Button>
            <Button variant="ghost" className={`text-white bg-[#ffffff]/10 ${theme.textHover}`}>
              <User className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Sign In</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`text-white bg-[#ffffff]/10 ${theme.textHover}`}>
                  <MoreVertical className="w-5 h-5 stroke-[3.5]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-40" 
                align="end" 
                sideOffset={5}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Premium</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Keyboard className="w-4 h-4 mr-2" />
                  <span>Shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        <div className="bg-[#ffffff]/10 rounded-lg p-5">
          <Tabs defaultValue="pomodoro" onValueChange={handleModeChange} className="w-full">
            <TabsList className={`w-full ${theme.bg}`}>
              <TabsTrigger 
                value="pomodoro" 
                className="flex-1 data-[state=active]:bg-[#000000]/10 text-white data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:font-bold"
              >
                Pomodoro
              </TabsTrigger>
              <TabsTrigger 
                value="shortBreak" 
                className="flex-1 data-[state=active]:bg-[#000000]/10 text-white data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:font-bold"
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger 
                value="longBreak" 
                className="flex-1 data-[state=active]:bg-[#000000]/10 text-white data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:font-bold"
              >
                Long Break
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="text-center my-20">
            <div className="text-white text-[120px] font-bold font-mono">
              {String(Math.floor(time / 60)).padStart(2, '0')}:
              {String(time % 60).padStart(2, '0')}
            </div>
            <Button
              className={`bg-white ${theme.text} hover:bg-white/90 px-12 py-6 text-xl font-bold mt-5
                  relative
                  shadow-[0_8px_#cccccc]
                  transform-gpu active:translate-y-[5px]
                  active:shadow-[0_3px_#cccccc]
                  transition-all duration-75
                `}
              onClick={isRunning ? pause : start}
            >
              {isRunning ? 'PAUSE' : 'START'}
            </Button>
          </div>
        </div>

        <div className="text-center mt-4 text-white/80">
          <div className="text-sm">#1</div>
          <div className="text-lg">Time to focus!</div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-white/90 mb-4">
            <h2 className="text-xl font-bold">Tasks</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={`text-white bg-[#ffffff]/10 ${theme.textHover}`}>
                  <MoreVertical className="w-5 h-5 stroke-[3.5]" />
                </Button>
          </div>
          {tasks.length > 0 && (
            <div className="space-y-2 mb-4">
              {tasks.map((task, index) => (
                <TaskItem
                  key={index}
                  title={task.title}
                  number={task.completedPomodoros || 0}
                  total={task.estimatedPomodoros}
                />
              ))}
            </div>
          )}
          {showTaskForm && (
            <TaskForm
              onClose={() => setShowTaskForm(false)}
              onSubmit={handleAddTask}
            />
          )}
          <Button 
            variant="outline" 
            onClick={() => setShowTaskForm(true)}
            className={`w-full border-white/50 border-dashed text-white/50 font-bold h-16 ${theme.bg}/50 hover:${theme.bg}/70 hover:border-white/70 hover:text-white/70`}
          >
            <span className="text-lg mr-2">+</span> Add Task
          </Button>

 
        </div>
      </main>
    </div>
  )
}

