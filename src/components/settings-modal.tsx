"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Timer, ListChecks, Volume2, Paintbrush, Bell, Share2 } from "lucide-react"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>SETTING</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Timer Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="h-4 w-4" />
              TIMER
            </div>
            <div className="space-y-4">
              <div>
                <Label>Time (minutes)</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-xs">Pomodoro</Label>
                    <Input type="number" defaultValue={25} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Short Break</Label>
                    <Input type="number" defaultValue={5} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Long Break</Label>
                    <Input type="number" defaultValue={15} className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Auto Start Breaks</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto Start Pomodoros</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Long Break interval</Label>
                  <Input type="number" defaultValue={4} className="w-20" />
                </div>
              </div>
            </div>
          </div>

          {/* Task Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ListChecks className="h-4 w-4" />
              TASK
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Auto Check Tasks</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Auto Switch Tasks</Label>
                <Switch />
              </div>
            </div>
          </div>

          {/* Sound Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Volume2 className="h-4 w-4" />
              SOUND
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Alarm Sound</Label>
                <Select defaultValue="kitchen">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ticking Sound</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Paintbrush className="h-4 w-4" />
              THEME
            </div>
            <div className="space-y-4">
              <div>
                <Label>Color Themes</Label>
                <div className="flex gap-2 mt-2">
                  <Button className="w-8 h-8 rounded-full bg-[#BA4949] p-0" />
                  <Button className="w-8 h-8 rounded-full bg-[#38858A] p-0" />
                  <Button className="w-8 h-8 rounded-full bg-[#397097] p-0" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Hour Format</Label>
                  <Select defaultValue="24">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24-hour</SelectItem>
                      <SelectItem value="12">12-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Dark Mode when running</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bell className="h-4 w-4" />
              NOTIFICATION
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Reminder</Label>
                <div className="flex items-center gap-2">
                  <Select defaultValue="last">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last">Last</SelectItem>
                      <SelectItem value="every">Every</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="number" defaultValue={5} className="w-20" />
                  <span className="text-sm text-muted-foreground">min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              INTEGRATION
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Todoist</Label>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label>Webhook</Label>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4" onClick={() => onOpenChange(false)}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  )
}

