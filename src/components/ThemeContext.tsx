import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    // Add transition class before theme change
    document.documentElement.style.setProperty('--transition-duration', '300ms');
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Ensure all theme-dependent elements update smoothly
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.transition = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease';
      }
    });

    // Clean up transition styles after theme change
    setTimeout(() => {
      elements.forEach(el => {
        if (el instanceof HTMLElement && !el.classList.contains('no-theme-transition')) {
          el.style.transition = '';
        }
      });
    }, 300);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
