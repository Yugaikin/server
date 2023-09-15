export class TaskDto{
    id;
    body;

    constructor(userId, task){
        this.id = userId
        this.body = task
    }
}