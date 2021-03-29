import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class List {
  readonly id: string;
  readonly name: string;
  readonly User?: User;
  readonly Todos?: (Todo | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<List>);
  static copyOf(source: List, mutator: (draft: MutableModel<List>) => MutableModel<List> | void): List;
}

export declare class User {
  readonly id: string;
  readonly username?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Todo {
  readonly id: string;
  readonly userID: string;
  readonly name: string;
  readonly note?: string;
  readonly priority?: number;
  readonly order?: number;
  readonly complete?: boolean;
  readonly deadline?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly listID?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}