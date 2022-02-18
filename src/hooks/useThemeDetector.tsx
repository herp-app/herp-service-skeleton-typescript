import { useEffect, useState } from "react";



export const useThemeDetector = () => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);  

    useEffect(() => {
        // detect window screen width function
        //@ts-ignore
        const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkTheme(getCurrentTheme());

    });

    const mqListener = (e: any) => {
        setIsDarkTheme(e.matches);
    };

    useEffect(() => {
        //@ts-ignore
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addEventListener("change", mqListener);
        return () => darkThemeMq.removeEventListener("change", mqListener);
      }, []);
      return isDarkTheme;

      
}