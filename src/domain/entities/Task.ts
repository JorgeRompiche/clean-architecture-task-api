import { TaskStatus } from "./TaskStatus";

import {
  InvalidTaskTitleError,
  InvalidStatusTransitionError,
} from "../errors/TaskErrors";

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  status?: TaskStatus;
  createdAt?: Date;
}

export class Task {
  private _id: string;
  private _title: string;
  private _description?: string;
  private _projectId: string;
  private _status: TaskStatus;
  private _createdAt: Date;

  constructor(props: TaskProps) {
    this.ValidateTitle(props.title);

    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._projectId = props.projectId;
    this._status = props.status ?? TaskStatus.PENDING;
    this._createdAt = props.createdAt ?? new Date();
  }

  //region      --- GETTERS
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get projectId(): string {
    return this._projectId;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  //end region  --- GETTERS

  //region      --- BEHAVIOR
  updateTitle(newTitle: string): void {
    this.ValidateTitle(newTitle);
    this._title = newTitle;
  }

  start(): void {
    if (this._status !== TaskStatus.PENDING)
      throw new InvalidStatusTransitionError();
    this._status = TaskStatus.IN_PROGRESS;
  }

  complete(): void {
    if (this._status !== TaskStatus.IN_PROGRESS)
      throw new InvalidStatusTransitionError();
    this._status = TaskStatus.COMPLETED;
  }
  //end region  --- BEHAVIOR

  //region        --- PRIVATE VALIDATIONS
  private ValidateTitle(title: string): void {
    if (!title || title.trim().length < 5) throw new InvalidTaskTitleError();
  }
  //end region    --- PRIVATE VALIDATIONS

  //region        --- PRESENTER
  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      projectId: this._projectId,
      status: this._status,
      createdAt: this._createdAt,
    };
  }
  //end region    --- PRESENTER
}
