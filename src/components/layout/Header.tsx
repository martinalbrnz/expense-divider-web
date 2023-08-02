import { Show } from "solid-js";
import { useCurrentUser } from "~/components/contexts/user";
import Avatar from "~/components/shared/Avatar";

const Header = () => {
  const [user] = useCurrentUser();

  return (
    <Show when={user()}>
      <div class="flex justify-center w-full bg-primary-600 dark:bg-primary-900 shadow">
        <div class="flex items-center justify-between w-full max-w-6xl p-4">
          <div class="flex items-center justify-start gap-4">
            <Avatar />
            <h1 class="text-gray-300 font-semibold text-2xl">
              Divisor de expensas
            </h1>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default Header;
