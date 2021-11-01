export namespace Task {

  export enum Status {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    ARCHIVED = 'ARCHIVED'
  }

  export interface Entity {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status: Status;
  }

}
