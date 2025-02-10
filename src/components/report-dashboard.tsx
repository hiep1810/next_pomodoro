import { Clock, Calendar, Flame, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "./ui/button"

export default function ReportDashboard({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg w-[90vw] max-w-4xl">
        <Button
              variant="ghost"
              className="absolute right-2 top-2 hover:bg-gray-100"
              onClick={onClose}
            >
              <X className="h-6 w-6 text-gray-500" />
            </Button>
          <div className="max-w-3xl mx-auto p-6">

            {/* Top Navigation */}


            <Tabs defaultValue="summary" className="w-full pt-8">
              <TabsList className="w-full bg-rose-100/50">
                <TabsTrigger value="summary" className="flex-1 data-[state=active]:bg-rose-200">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="detail" className="flex-1 data-[state=active]:bg-rose-200">
                  Detail
                </TabsTrigger>
                <TabsTrigger value="ranking" className="flex-1 data-[state=active]:bg-rose-200">
                  Ranking
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Activity Summary */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Activity Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-rose-50">
                  <div className="flex flex-col items-center">
                    <Clock className="w-6 h-6 text-rose-400 mb-2" />
                    <span className="text-3xl font-bold text-rose-500">0</span>
                    <span className="text-sm text-gray-600">hours focused</span>
                  </div>
                </Card>
                <Card className="p-6 bg-rose-50">
                  <div className="flex flex-col items-center">
                    <Calendar className="w-6 h-6 text-rose-400 mb-2" />
                    <span className="text-3xl font-bold text-rose-500">2</span>
                    <span className="text-sm text-gray-600">days accessed</span>
                  </div>
                </Card>
                <Card className="p-6 bg-rose-50">
                  <div className="flex flex-col items-center">
                    <Flame className="w-6 h-6 text-rose-400 mb-2" />
                    <span className="text-3xl font-bold text-rose-500">1</span>
                    <span className="text-sm text-gray-600">day streak</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Focus Hours */}
            <div className="mt-12">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Focus Hours</h2>

              {/* Time Period Tabs */}
              <div className="flex justify-between items-center mb-6">
                <Tabs defaultValue="week" className="w-[300px]">
                  <TabsList className="bg-rose-100/50">
                    <TabsTrigger value="week" className="data-[state=active]:bg-rose-200">
                      Week
                    </TabsTrigger>
                    <TabsTrigger value="month" className="data-[state=active]:bg-rose-200">
                      Month
                    </TabsTrigger>
                    <TabsTrigger value="year" className="data-[state=active]:bg-rose-200">
                      Year
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">&lt;</button>
                  <span className="text-sm text-gray-600">This Week</span>
                  <button className="p-2 text-gray-500 hover:text-gray-700">&gt;</button>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[300px] bg-white p-4 rounded-lg border mb-6">
                <div className="flex justify-between h-full items-end">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className="w-4/5 bg-rose-100"
                        style={{
                          height: i === 1 ? "120px" : i === 6 ? "40px" : "0px",
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Table */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm font-medium text-gray-500">PROJECT</div>
                    <div className="text-sm font-medium text-gray-500 text-right">TIME(HH:MM)</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-rose-200 rounded-sm" />
                      <span className="text-sm text-gray-700">No Project</span>
                    </div>
                    <div className="text-sm text-gray-700 text-right">00:01</div>
                  </div>
                </div>
                <div className="p-4 border-t bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm font-medium text-gray-700">Total</div>
                    <div className="text-sm font-medium text-gray-700 text-right">00:01</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

