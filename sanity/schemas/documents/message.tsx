import { defineType, defineField } from 'sanity';

const message = defineType({
  name: 'messages',
  type: 'object',
  title: 'Messages',
  fields: [
    defineField({
      type: 'text',
      name: 'messageType',
      title: 'success, error or info. default is info',
      rows: 1
    }),
    defineField({
      type: 'text',
      name: 'title',
      title: 'Title of the message',
      rows: 1
    }),
    defineField({
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ]
});

export default message;
