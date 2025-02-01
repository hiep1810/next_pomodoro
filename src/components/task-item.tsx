'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface TaskItemProps {
  title: string
  number: number
  total: number
}

export function TaskItem({ title, number, total }: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Card className="w-full rounded-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsChecked(!isChecked)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${isChecked ? "bg-orange-500" : "bg-gray-200"
                }`}
            >
              <Check className="h-4 w-4 text-white stroke-[3.5]" />
            </div>
          </button>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {number}/{total}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 border-2 border-gray-300">
            <MoreVertical className="h-5 w-5 stroke-[3.5] text-gray-500" />
          </Button>
        </div>
      </div>
    </Card>
  )
} 