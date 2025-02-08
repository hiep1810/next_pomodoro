'use client'

import { useState, useEffect } from 'react'
import { Settings, BarChart2, MoreVertical, User, LogIn, Star, Keyboard, Check, Trash2, Eye, List, Lock, FileText, SkipForward } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePomodoro } from '@/hooks/use-pomodoro'
import { PomodoroMode, themeMap } from '@/utils/theme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskForm } from '@/components/task-form'
import { TaskItem } from '@/components/task-item'
import { Task } from '@/models/Task'
import { TaskListHandler } from '@/utils/TaskListHandler'

export default function PomodoroTimer() {
  const [mode, setMode] = useState<PomodoroMode>('pomodoro')
  const theme = themeMap[mode]

  const onTimeEnd = () => {
    let selectedTask = tasks.find(task => task.id === selectedTaskId)
    if(mode === 'pomodoro'){
      setCompletedPomosCount(completedPomosCount + 1)
      if(selectedTask){
        selectedTask.completedPomodoros += 1
        setTasks([...tasks])
      }
    }
  }

  const { time, setTime, isRunning, start, pause, reset } = usePomodoro({
    initialTime: 1500, // 25 minutes
    onTimeEnd: onTimeEnd,
  })  
  
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [estimatedPomos, setEstimatedPomos] = useState(0)
  const [completedPomos, setCompletedPomos] = useState(0)
  const [completedPomosCount, setCompletedPomosCount] = useState(0)

  useEffect(() => {
    const taskList = new TaskListHandler(tasks)
    const estimatedPomos = taskList.getEstimatedPomodorosCount()
    const completedPomos = taskList.getCompletedPomodorosCount()
    setEstimatedPomos(estimatedPomos)
    setCompletedPomos(completedPomos)
  }, [tasks])


  const handleModeChange = (value: string) => {
    setMode(value as PomodoroMode)
    reset()
    if (value === 'pomodoro') {
      setTime(25 * 60)
    } else if (value === 'shortBreak') {
      setTime(5 * 60)
    } else if (value === 'longBreak') {
      setTime(15 * 60)
    }
  }

  const handleAddTask = (title: string, estimatedPomodoros: number) => {
    const task = new Task(title, false, estimatedPomodoros, 0)
    if (tasks.length === 0){
      setSelectedTaskId(task.id)
    }
    setTasks([...tasks, task])
  }

  const handleCheckTask = (id: string) => {
    const task = tasks.find(task => task.id === id)
    if (task) {
      task.checked = !task.checked
      setTasks([...tasks])
    }
  }

  const handleSelectTask = (id: string) =>{
    const task = tasks.find(task => task.id === id)
    if (task) {
      setSelectedTaskId(task.id)
    }
  }

  const handleSkipForward = () =>{
    let nextMode = '';
    if (mode == 'pomodoro'){
      setCompletedPomosCount(completedPomosCount + 1)
      if(completedPomosCount % 4 === 0 && completedPomosCount != 0){
        nextMode = 'longBreak'
      }
      else{
        nextMode = 'shortBreak'
      }
    }
    else if (mode == 'shortBreak'){
      nextMode = 'pomodoro'
    }
    else if (mode == 'longBreak'){
      nextMode = 'pomodoro'
    }
    onTimeEnd()
    handleModeChange(nextMode)
  }

  const calculateFinishAt = () => {
    const taskList = new TaskListHandler(tasks)
    const finishAt = taskList.getFinishAt()
    return finishAt
  }

  const calculateRemainingTime = () => {
    const taskList = new TaskListHandler(tasks)
    const remainingTime = taskList.getRemainingTime()
    return remainingTime
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
          <Tabs defaultValue="pomodoro" value={mode} onValueChange={handleModeChange} className="w-full">
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
            <div className="flex items-center justify-center">
              <Button
                className={`bg-white ${theme.text} hover:bg-white/90 px-12 py-6 text-xl font-bold
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
              <Button
                className={`hover:bg-white/10 ml-60 text-white hover:text-white
                    absolute
                  `}
                  onClick={handleSkipForward}
                variant="ghost"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                align="end"
                sideOffset={5}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                  Clear finished tasks
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="h-4 w-4" />
                  Use Template
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-not-allowed text-gray-400">
                  <List className="h-4 w-4" />
                  Import from Todoist
                  <Lock className="h-3 w-3 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Check className="h-4 w-4" />
                  Clear act pomodoros
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-not-allowed text-gray-400">
                  <Eye className="h-4 w-4" />
                  Hide tasks
                  <Lock className="h-3 w-3 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                  Clear all tasks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {tasks.length > 0 && (
            <div className="space-y-2 mb-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  selected={selectedTaskId == task.id ? true: false}
                  checked={task.checked}
                  title={task.title}
                  number={task.completedPomodoros}
                  total={task.estimatedPomodoros}
                  onCheck={handleCheckTask}
                  onSelected={handleSelectTask}
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
        <div className="mt-8">
          <div className="text-white/90 bg-white/10 p-6 border-t-2 border-white">
            <div className="flex justify-between items-center">
              <div>
                <span>Pomos: </span>
                <span className="text-xl font-bold">{completedPomos}</span>
                <span className="text-xlfont-bold">/</span>
                <span className="text-xl font-bold">{estimatedPomos}</span>
              </div>
              <div>
                <span>Finish At: </span>

                <span className="text-xl font-bold">{calculateFinishAt()}</span>
                <span> ({calculateRemainingTime()}h)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

