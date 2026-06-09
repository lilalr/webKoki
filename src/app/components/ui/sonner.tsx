import { useTheme } from "../../context/ThemeContext";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { mode } = useTheme();

  return (
    <Sonner
      theme={mode === "dark" ? "dark" : "light"}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
