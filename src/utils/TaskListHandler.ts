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
        let estimatedPomodoros = 0
        let completedPomodoros = 0

        for(let i = 0; i < this.tasks.length; i++){
            if(!this.tasks[i].checked){
                if(this.tasks[i].completedPomodoros < this.tasks[i].estimatedPomodoros){
                    estimatedPomodoros += this.tasks[i].estimatedPomodoros
                    completedPomodoros += this.tasks[i].completedPomodoros
                }
            }
        }
        const remainingPomodoros = estimatedPomodoros - completedPomodoros
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        


        if (remainingPomodoros > 0){
            const remainingTime = remainingPomodoros * 25
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
        let estimatedPomodoros = 0
        let completedPomodoros = 0

        for(let i = 0; i < this.tasks.length; i++){
            if(!this.tasks[i].checked){
                if(this.tasks[i].completedPomodoros < this.tasks[i].estimatedPomodoros){
                    estimatedPomodoros += this.tasks[i].estimatedPomodoros
                    completedPomodoros += this.tasks[i].completedPomodoros
                }
            }
        }
        const remainingPomodoros = estimatedPomodoros - completedPomodoros
        const remainingTime = Number((remainingPomodoros * 25 / 60).toFixed(1))
        return remainingTime > 0 ? remainingTime : 0

    }
}