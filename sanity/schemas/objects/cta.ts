import { defineField, defineType } from 'sanity';
import { VscInspect } from 'react-icons/vsc';

export default defineType({
  name: 'cta',
  title: 'Call-to-action',
  icon: VscInspect,
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      type: 'link'
    }),
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: ['default', 'outline', 'ghost', 'link']
      }
    })
  ],
  preview: {
    select: {
      label: 'link.label',
      _type: 'link.internal._type',
      pageTitle: 'link.internal.title',
      parent1: 'link.internal.parent.0.metadata.slug.current',
      parent2: 'link.internal.parent.1.metadata.slug.current',
      parent3: 'link.internal.parent.2.metadata.slug.current',
      internal: 'link.internal.metadata.slug.current',
      params: 'link.params',
      external: 'link.external'
    },
    prepare: ({ label, pageTitle }) => ({
      title: label || pageTitle
    })
  }
});
