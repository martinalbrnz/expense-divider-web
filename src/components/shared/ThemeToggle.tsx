import { RiWeatherMoonClearLine, RiWeatherSunLine } from "solid-icons/ri";
import { useTheme } from "~/components/contexts/theme";
const ThemeToggle = () => {
  const [isDark, { toggleTheme }]: any = useTheme();

  return (
    <div
      onclick={() => toggleTheme()}
      class="relative w-10 h-10 rounded-full overflow-hidden shadow-sm dark:shadow-zinc-700 cursor-pointer"
    >
      <div
        class="flex flex-col gap-2 items-center justify-center transition-transform -translate-x-7 -translate-y-1 duration-1000 w-24 h-24 text-2xl"
        classList={{ "-rotate-180": isDark() }}
        style={{
          "background-image":
            "conic-gradient(from -90deg, rgba(226,247,245,1) 40%, rgba(35,35,87,1) 60%)",
        }}
      >
        <div class="flex items-center justify-center w-10 h-10">
          <RiWeatherSunLine class="text-yellow-500 animate-wiggle" />
        </div>
        <div class="flex items-center justify-center w-10 h-10 rotate-180">
          <RiWeatherMoonClearLine class="text-white animate-wiggle" />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
