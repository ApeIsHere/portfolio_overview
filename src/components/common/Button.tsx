import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.FormEvent) => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      className={`button ${variant} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
