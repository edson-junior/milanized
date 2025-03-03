import { defineField, defineType } from 'sanity';
import { VscLink } from 'react-icons/vsc';

const EXTERNAL_LINK = 'external';
const INTERNAL_LINK = 'internal';

export default defineType({
  name: 'link',
  title: 'Link',
  icon: VscLink,
  type: 'object',
  options: {
    columns: 2
  },
  fields: [
    defineField({
      name: 'label',
      type: 'string'
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: INTERNAL_LINK, value: INTERNAL_LINK },
          { title: EXTERNAL_LINK, value: EXTERNAL_LINK }
        ]
      }
    }),
    defineField({
      name: INTERNAL_LINK,
      type: 'reference',
      to: [{ type: 'blog' }],
      hidden: ({ parent }) => parent?.type !== INTERNAL_LINK
    }),
    defineField({
      name: EXTERNAL_LINK,
      placeholder: 'https://example.com',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true
        }),
      hidden: ({ parent }) => parent?.type !== EXTERNAL_LINK
    }),
    defineField({
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean',
      hidden: ({ parent }) => parent?.type !== EXTERNAL_LINK
    })
  ],
  preview: {
    select: {
      label: 'label',
      _type: 'internal._type',
      title: 'internal.title',
      internal: 'internal.metadata.slug.current',
      params: 'params',
      external: EXTERNAL_LINK
    },
    prepare: ({ label, title, _type, internal, params, external }) => {
      return {
        title: label || title,
        subtitle: processSlug({ _type, internal, params, external })
      };
    }
  }
});

function processSlug({
  _type,
  internal,
  params,
  external
}: {
  // internal
  _type?: string;
  internal?: string;
  params?: string;
  // external
  external?: string;
}) {
  if (external) return external;

  if (internal) {
    const segment = _type === 'blog' ? '/blog/' : '/';
    const path = internal === 'index' ? null : internal;

    return [segment, path, params].filter(Boolean).join('');
  }

  return undefined;
}
