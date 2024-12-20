interface ButtonProps {
    onClick: () => void;
    className: string;
    text: string;
}

const Button = ({ onClick, className, text }: ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button; 