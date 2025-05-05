// ErrorDisplay Component
const ErrorDisplay = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => {
  return (
    <div>
      <p className="text-red-400 mt-4 text-center">{message}</p>
      <button
        onClick={onRetry}
        className="bg-gray-600 rounded-lg py-2 px-4 text-gray-200 mt-3 w-full hover:bg-gray-500"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;
