export interface Reminder {
  id: string;
  title: string;
  details: string;
  datetime: string;
}

export interface Todo {
  id: string;
  text: string;
  details: string;
  completed: boolean;
}

export interface SystemCredentials {
  username: string;
  password: string;
  url: string;
}