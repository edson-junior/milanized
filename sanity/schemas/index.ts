import { type SchemaTypeDefinition } from 'sanity';
import author from './documents/author';
import blog from './documents/blog';
import page from './documents/page';
import metadata from './objects/metadata';
import message from './documents/message';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, page, metadata, author, message]
};
