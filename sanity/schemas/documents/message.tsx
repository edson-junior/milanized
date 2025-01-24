import { defineType, defineField } from 'sanity';
import { externalLinks, internalLinks } from './blog';

const message = defineType({
  name: 'messages',
  type: 'object',
  title: 'Messages',
  fields: [
    defineField({
      title: 'Success, error or info messages',
      name: 'messageType',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Success', value: 'success' },
          { title: 'Error', value: 'error' }
        ]
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required()
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
      of: [
        {
          type: 'block',
          marks: {
            annotations: [externalLinks, internalLinks]
          }
        }
      ]
    })
  ]
});

export default message;
