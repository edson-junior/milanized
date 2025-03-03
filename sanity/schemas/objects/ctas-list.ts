import { defineField, defineType } from 'sanity';
import { VscInspect } from 'react-icons/vsc';

export default defineType({
  name: 'ctas',
  title: 'Calls to Action',
  icon: VscInspect,
  type: 'object',
  fields: [
    defineField({
      name: 'ctas',
      title: 'Calls to Actions',
      type: 'array',
      of: [{ type: 'cta' }]
    })
  ],
  preview: {
    prepare: () => ({
      title: 'Calls to Action'
    })
  }
});
