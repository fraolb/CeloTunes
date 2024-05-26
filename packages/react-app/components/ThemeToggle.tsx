import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="w-20 h-8 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow-md border border-solid"
      onClick={toggleTheme}
    >
      <div
        id="switch-toggle"
        className={`w-12 h-12 relative rounded-full transition duration-500 transform p-1 text-white flex justify-center items-center ${
          theme === "light"
            ? "bg-yellow-500 -translate-x-2"
            : "bg-gray-700 translate-x-full"
        }`}
      >
        {theme === "light" ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
