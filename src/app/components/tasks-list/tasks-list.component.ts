import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  currentTask?: Task;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }


  retrieveTasks(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.tasksService.getAll(params)
    .subscribe(
      response => {
        const { tasks, totalItems } = response;
        this.tasks = tasks;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTasks();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTasks();
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = undefined;
    this.currentIndex = -1;
  }

  setActiveTasks(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  removeAllTasks(): void {
    this.tasksService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.tasksService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tasks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
