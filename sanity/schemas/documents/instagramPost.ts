import { defineField, defineType } from 'sanity';
import InstagramPreview from '../previews/instagramPost';

export default defineType({
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      description: 'Visit an Instagram post in a browser and copy the URL.'
    })
  ],
  preview: {
    select: {
      url: 'url'
    }
  },
  components: {
    preview: InstagramPreview
  }
});
