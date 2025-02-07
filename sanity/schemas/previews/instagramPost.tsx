import { InstagramEmbed } from 'react-social-media-embed';
import { PreviewProps } from 'sanity';

const InstagramPreview = (props: PreviewProps & { url?: string }) => {
  const modifiedProps = {
    ...props,
    title: props.schemaType?.title
  };

  if (!props.url) {
    return <p>Missing URL for Instagram post</p>;
  }

  return (
    <>
      {props.renderDefault(modifiedProps)}
      <InstagramEmbed url={props.url} />
    </>
  );
};

export default InstagramPreview;
