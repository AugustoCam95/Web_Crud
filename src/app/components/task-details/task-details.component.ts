import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  currentTask: Task = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTask(this.route.snapshot.params.id);
  }

  getTask(id: string): void {
    this.taskService.get(id)
      .subscribe(
        data => {
          this.currentTask = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description,
      published: status
    };

    this.taskService.update(this.currentTask.id, data)
      .subscribe(
        response => {
          this.currentTask.published = status;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  updateTask(): void {
    this.taskService.update(this.currentTask.id, this.currentTask)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteTask(): void {
    this.taskService.delete(this.currentTask.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }

}
