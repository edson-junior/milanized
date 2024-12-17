import { VscMultipleWindows } from 'react-icons/vsc';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: VscMultipleWindows,
  fields: [
    defineField({
      name: 'title',
      type: 'string'
    }),
    defineField({
      name: 'metadata',
      type: 'metadata'
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
            },
            {
              type: 'text',
              name: 'caption',
              title: 'Caption of the image'
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'metadata.slug.current',
      media: 'metadata.image'
    },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug && (slug === 'homepage' ? '/' : `/${slug}`)
    })
  }
});
