interface ButtonProps {
    id: string;
    name: string;
    className?: string;
    text: string;
    onClick: Function;
}

const MyButton = (props: ButtonProps) => {
    const { id, name, className, text, onClick } = props;

    return (
        <button
            id={id}
            name={name}
            className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-lg text-white rounded-full ${className}`}
            onClick={() => onClick()}
        >
            {text}
        </button>
    );
};

export default MyButton;