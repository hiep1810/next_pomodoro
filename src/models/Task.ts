import { v4 as uuidv4 } from 'uuid';

export class Task {
    id: string;
    title: string;
    checked: boolean;
    estimatedPomodoros: number;
    completedPomodoros: number;

    constructor(title: string, estimatedPomodoros: number, completedPomodoros: number, checked: boolean) {
        this.id = uuidv4()
        this.title = title
        this.estimatedPomodoros = estimatedPomodoros
        this.completedPomodoros = completedPomodoros
        this.checked = checked
    }
}

