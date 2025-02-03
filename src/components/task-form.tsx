'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

export interface TaskFormProps {
  onClose: () => void
  onSubmit: (title: string, estimatedPomodoros: number) => void
}
export function TaskForm({ onClose, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onSubmit(
      title,
      estimatedPomodoros
    )
    
    setTitle('')
    onClose()
  }

  return (
    <Card 
      className="w-full mb-4 animate-expandVertical">
      <form>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="What are you working on?"
              className="text-lg border-0 px-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground font-normal">Est Pomodoros</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Input 
                  type="number" 
                  value={estimatedPomodoros}
                  min={1}
                  onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
                  className="w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <div className="flex flex-row gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className='
                      relative
                      shadow-[0_2px_#cccccc]
                      transform-gpu active:translate-y-[1px]
                      active:shadow-[0_1px_#cccccc]
                      transition-all duration-75
                    '
                    style={{
                      border: '1px solid #cccccc'
                    }}
                    onClick={() => setEstimatedPomodoros(prev => prev + 1)}
                  >
                    <span className="text-xs">▲</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost" 
                    size="icon"
                    className='
                      relative
                      shadow-[0_2px_#cccccc]
                      transform-gpu active:translate-y-[1px]
                      active:shadow-[0_1px_#cccccc]
                      transition-all duration-75
                    '
                    style={{
                      border: '1px solid #cccccc'
                    }}
                    onClick={() => setEstimatedPomodoros(prev => Math.max(1, prev - 1))}
                  >
                    <span className="text-xs">▼</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <button type="button" className="hover:text-foreground">
              + Add Note
            </button>
            <button 
              type="button" className="hover:text-foreground flex items-center gap-1">
              + Add Project
              <Lock className="h-3 w-3" />
            </button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 py-3">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
} 