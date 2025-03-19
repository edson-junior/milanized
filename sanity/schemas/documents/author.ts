import { LuUser } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: LuUser,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'metadata',
      type: 'metadata'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: []
        }
      ]
    }),
    defineField({
      name: 'social',
      type: 'array',
      of: [{ type: 'link' }]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
});
