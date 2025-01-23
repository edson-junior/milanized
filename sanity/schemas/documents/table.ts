import { defineField, defineType } from 'sanity';
// import InstagramPreview from '../previews/instagramPost';

export default defineType({
  name: 'tableRichText',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'table',
      type: 'table'
      // description: 'Visit an Instagram post in a browser and copy the URL.'
    })
  ]
});

// preview: {
//   select: {
//     url: 'url'
//   }
// },
// components: {
//   preview: InstagramPreview
// }
