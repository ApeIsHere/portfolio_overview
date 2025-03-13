import "./Input.scss";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  variant?: "primary" | "search";
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  variant = "primary",
}) => {
  return (
    <input
      className={`input ${variant}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
