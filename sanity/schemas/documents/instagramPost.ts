import { defineField, defineType } from 'sanity';
import InstagramPreview from '../previews/instagramPost';
import { LuInstagram } from 'react-icons/lu';

export default defineType({
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'object',
  icon: LuInstagram,
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
