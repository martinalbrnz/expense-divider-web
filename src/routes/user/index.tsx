const User = () => {
  const { avatar, name, username } = localStorage;
  return (
    <>
      <div class="flex gap-4 items-center bg-slate-50 p-2 rounded">
        <img class="w-20 rounded-full" src={avatar} alt={name} />
        <div class="flex flex-col">
          <p class="text-slate-800 text-lg">{name}</p>
          <p class="text-slate-400 text-sm">{username}</p>
        </div>
      </div>
    </>
  );
};

export default User;
