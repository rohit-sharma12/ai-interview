
const SpinnerLoader = () => {
    return (
        <div role="status">
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
        </div>
    );
};

export default SpinnerLoader;

