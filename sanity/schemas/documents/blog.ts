import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.max(70).warning()
    }),
    defineField({
      name: 'metadata',
      type: 'metadata'
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean'
    }),
    defineField({
      name: 'summary',
      type: 'text',
      validation: (rule) => rule.required().min(10).max(170)
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      fields: [
        {
          type: 'text',
          name: 'alt',
          title: 'Alternative text',
          rows: 1
        },
        {
          type: 'text',
          name: 'caption',
          title: 'Caption of the image',
          rows: 1
        }
      ]
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
        },
        defineArrayMember({
          type: 'messages'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'metadata.slug.current',
      media: 'featuredImage',
      author: 'author.name'
    },
    prepare: (selection) => {
      const { author, slug } = selection;

      return {
        ...selection,
        subtitle: author ? `by ${author}` : slug
      };
    }
  }
});
