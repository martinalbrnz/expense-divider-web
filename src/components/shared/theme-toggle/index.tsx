import { RiWeatherMoonClearLine, RiWeatherSunLine } from "solid-icons/ri";
import { useTheme } from "~/components/contexts/theme";
const ThemeToggle = () => {
  const [isDark, { toggleTheme }]: any = useTheme();

  return (
    <div
      onclick={() => toggleTheme()}
      class="relative w-10 h-10 rounded-full overflow-hidden border"
    >
      <div
        class="flex flex-col items-center justify-center border rounded-full transition-transform -translate-x-5 duration-[2s] w-20 h-20 text-2xl"
        classList={{ "-rotate-180": isDark() }}
      >
        <div class="flex items-center justify-center w-10 h-10">
          <RiWeatherSunLine class="text-yellow-500" />
        </div>
        <div class="flex items-center justify-center w-10 h-10 rotate-180">
          <RiWeatherMoonClearLine class="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
