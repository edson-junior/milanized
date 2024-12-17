import { defineField, defineType } from 'sanity';
import { VscTag } from 'react-icons/vsc';

const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: VscTag,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: (Rule) => Rule.required()
    })
  ]
});

export default category;
