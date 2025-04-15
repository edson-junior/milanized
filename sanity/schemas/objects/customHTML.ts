import { LuCode } from 'react-icons/lu';

import { defineField } from 'sanity';

const customHTML = defineField({
  name: 'customHTML',
  type: 'object',
  title: 'Custom HTML',
  description: 'Render custom HTML snippets',
  icon: LuCode,
  fields: [
    {
      title: 'HTML Snippet',
      name: 'HTMLSnippet',
      type: 'code'
    }
  ]
});

export default customHTML;
