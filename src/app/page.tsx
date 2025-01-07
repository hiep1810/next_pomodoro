'use client'

import { useState } from 'react'
import { Settings, BarChart2, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePomodoro } from '@/hooks/use-pomodoro'

export default function PomodoroTimer() {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro')
  const { time, isRunning, start, pause, reset } = usePomodoro()

  const handleModeChange = (value: string) => {
    setMode(value as 'pomodoro' | 'shortBreak' | 'longBreak')
    reset()
  }

  return (
    <div className="min-h-screen bg-[#ba4949]">
      <header className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full" />
            <span className="text-white font-bold text-2xl">Pomofocus</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <BarChart2 className="w-5 h-5" />
              <span className="ml-2">Report</span>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
              <span className="ml-2">Setting</span>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <span>Sign In</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        <div className="bg-[#c15c5c] rounded-lg p-5">
          <Tabs defaultValue="pomodoro" onValueChange={handleModeChange} className="w-full">
            <TabsList className="w-full bg-[#ba4949]/30">
              <TabsTrigger 
                value="pomodoro" 
                className="flex-1 data-[state=active]:bg-[#ba4949] text-white"
              >
                Pomodoro
              </TabsTrigger>
              <TabsTrigger 
                value="shortBreak" 
                className="flex-1 data-[state=active]:bg-[#ba4949] text-white"
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger 
                value="longBreak" 
                className="flex-1 data-[state=active]:bg-[#ba4949] text-white"
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
              className="bg-white text-[#ba4949] hover:bg-white/90 px-12 py-6 text-xl font-bold mt-5"
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
            <Button variant="ghost" size="icon" className="text-white/90 hover:bg-white/10">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="w-full border-white/20 border-dashed text-white hover:bg-white/10 hover:border-white/20"
          >
            <span className="text-lg mr-2">+</span> Add Task
          </Button>
        </div>


      </main>
    </div>
  )
}

