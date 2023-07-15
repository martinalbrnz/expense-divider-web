import { RiUserFacesUser3Line } from "solid-icons/ri";
import { useTheme } from "~/components/contexts/theme";

const Header = () => {
  const [isDark, { toggleTheme }]: any = useTheme();

  return (
    <div class="flex justify-center w-full bg-primary-600 dark:bg-primary-900 shadow">
      <div class="flex justify-between w-full max-w-6xl p-2">
        <div>{/* <ThemeToggle /> */}</div>
        <div class="flex items-center justify-center bg-gray-200 h-14 w-14 rounded-full">
          <RiUserFacesUser3Line class="text-4xl text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;
