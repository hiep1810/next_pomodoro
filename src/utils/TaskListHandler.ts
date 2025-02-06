import { Task } from "../models/Task"

export class TaskListHandler {
    private readonly tasks: Task[]
    
    constructor(tasks: Task[]) {
        this.tasks = tasks
    }

    public getAllTasks(): Task[] {
        return this.tasks
    }

    public getCompletedTasks(): Task[] {
        return this.tasks.filter(task => task.checked)
    }

    public getActiveTasks(): Task[] {
        return this.tasks.filter(task => !task.checked)
    }

    public getCompletedPomodorosCount(): number {
        return this.tasks.reduce(
            (sum, task) => sum + task.completedPomodoros,
            0
        )
    }

    public getEstimatedPomodorosCount(): number {
        return this.tasks.reduce(
            (sum, task) => !task.checked ? sum + task.estimatedPomodoros : sum,
            0
        )
    }


    public getFinishAt(): string {
        const remainingPomos = this.getEstimatedPomodorosCount() - this.getCompletedPomodorosCount()
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        
        if (remainingPomos > 0){
            const remainingTime = remainingPomos * 25
            const finishAt = new Date(Date.now() + remainingTime * 60 * 1000)
            return finishAt.toLocaleString('en-US', {
                timeZone: timezone, hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        }
        return new Date(Date.now()).toLocaleString('en-US', {
            timeZone: timezone, hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    }

    public getRemainingTime(): number {
        const remainingPomos = this.getEstimatedPomodorosCount() - this.getCompletedPomodorosCount()
        const remainingTime = Number((remainingPomos * 25 / 60).toFixed(1))
        return remainingTime > 0 ? remainingTime : 0
    }
}