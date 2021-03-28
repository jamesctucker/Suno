/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($owner: String) {
    onCreateList(owner: $owner) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($owner: String) {
    onUpdateList(owner: $owner) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($owner: String) {
    onDeleteList(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
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
