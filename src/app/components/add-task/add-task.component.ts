import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;


  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      title: this.task.title,
      description: this.task.description
    };

    this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      title: '',
      description: '',
      published: false
    };
  }

}
