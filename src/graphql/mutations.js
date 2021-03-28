/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      User {
        username
        createdAt
        updatedAt
        id
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Todos {
        items {
          userID
          name
          note
          priority
          order
          complete
          deadline
          createdAt
          updatedAt
          id
          listID
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      User {
        username
        createdAt
        updatedAt
        id
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Todos {
        items {
          userID
          name
          note
          priority
          order
          complete
          deadline
          createdAt
          updatedAt
          id
          listID
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      User {
        username
        createdAt
        updatedAt
        id
        _version
        _deleted
        _lastChangedAt
        owner
      }
      Todos {
        items {
          userID
          name
          note
          priority
          order
          complete
          deadline
          createdAt
          updatedAt
          id
          listID
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      username
      createdAt
      updatedAt
      id
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      username
      createdAt
      updatedAt
      id
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      username
      createdAt
      updatedAt
      id
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      userID
      name
      note
      priority
      order
      complete
      deadline
      createdAt
      updatedAt
      id
      listID
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      userID
      name
      note
      priority
      order
      complete
      deadline
      createdAt
      updatedAt
      id
      listID
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      userID
      name
      note
      priority
      order
      complete
      deadline
      createdAt
      updatedAt
      id
      listID
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
