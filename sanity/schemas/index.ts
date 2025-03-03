import { type SchemaTypeDefinition } from 'sanity';
import author from './documents/author';
import blog from './documents/blog';
import page from './documents/page';
import metadata from './objects/metadata';
import message from './documents/message';
import instagramPost from './documents/instagramPost';
import links from './objects/links';
import linksList from './objects/links-list';
import category from './documents/category';
import table from './documents/table';
import cta from './objects/cta';
import ctasList from './objects/ctas-list';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blog,
    category,
    page,
    metadata,
    author,
    message,
    instagramPost,
    table,
    links,
    linksList,
    cta,
    ctasList
  ]
};
