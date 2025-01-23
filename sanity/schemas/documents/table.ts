import { LuTable } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';
import { TableWidget } from '../previews/TableWidget';

export default defineType({
  name: 'tableRichText',
  title: 'Table',
  type: 'object',
  icon: LuTable,
  fields: [
    defineField({
      name: 'table',
      title: 'Table',
      type: 'table'
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Provide an accessible description for this table'
    })
  ],
  preview: {
    select: {
      table: 'table',
      caption: 'caption'
    }
  },
  components: {
    preview: TableWidget
  }
});
