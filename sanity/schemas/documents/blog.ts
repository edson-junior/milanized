import { LuExternalLink, LuLink, LuNewspaper } from 'react-icons/lu';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: LuNewspaper,
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
      name: 'publishDate',
      type: 'date'
      // validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ]
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
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                icon: LuExternalLink,
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description:
                      'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean'
                  }
                ]
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                icon: LuLink,
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [{ type: 'blog' }, { type: 'page' }]
                  }
                ]
              }
            ]
          }
        },
        {
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
        },
        { type: 'instagramPost' },
        { type: 'tableRichText' },
        defineArrayMember({
          type: 'messages'
        })
      ]
    }),
    defineField({
      title: 'Related Articles',
      name: 'relatedArticles',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'blog' } }]
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
