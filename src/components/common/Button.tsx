interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ text, onClick, className, disabled }: ButtonProps) {
  return (
    <button
      className={`appearance-none cursor-pointer p-1 border hover:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
