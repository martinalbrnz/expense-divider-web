import { Show } from "solid-js";

export interface AvatarPropsI {
  filename?: string;
  collectionId?: string;
  id?: string;
  alt?: string;
  extraClass?: string;
}

const Avatar = ({
  filename,
  collectionId,
  id,
  alt,
  extraClass,
}: AvatarPropsI) => {
  const avatarURL = `${
    import.meta.env.VITE_API_URL
  }/api/files/${collectionId}/${id}/${filename}`;

  return (
    <Show
      when={filename && collectionId && id}
      fallback={
        <div
          class={`${extraClass} bg-white shadow-sm flex items-center justify-center`}
        >
          <span class={`text-sm text-slate-300 font-bold`}>No photo</span>
        </div>
      }
    >
      <img class={`${extraClass} shadow-sm`} src={avatarURL} />
    </Show>
  );
};

export default Avatar;
