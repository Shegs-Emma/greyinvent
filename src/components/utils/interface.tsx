export interface TodosInterface {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface CreateTodoInterface {
  title: string;
  completed: boolean;
  userId: number;
}
