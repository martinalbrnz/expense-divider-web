import Avatar from "~/components/shared/Avatar";
import ThemeToggle from "~/components/shared/ThemeToggle";

const Header = () => {
  return (
    <div class="flex justify-center w-full bg-primary-600 dark:bg-primary-900 shadow">
      <div class="flex items-center justify-between w-full max-w-6xl p-2">
        <ThemeToggle />
        <div></div>
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
