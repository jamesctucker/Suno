// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { List, User, Todo } = initSchema(schema);

export {
  List,
  User,
  Todo
};