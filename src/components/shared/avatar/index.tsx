export interface AvatarPropsI {
  filename?: string;
  collectionId?: string;
  id?: string;
  alt?: string;
  extraClass?: string;
}

const Avatar = (props: AvatarPropsI) => {
  const avatarURL = `${import.meta.env.VITE_API_URL}/api/files/${
    props.collectionId
  }/${props.id}/${props.filename}`;

  return <img class={props.extraClass} src={avatarURL} />;
};

export default Avatar;
