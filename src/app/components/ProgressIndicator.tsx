// ProcessingIndicator Component
const ProgressIndicator = ({ progress }: { progress: number }) => {
  return (
    <div className="mt-6">
      <p className="text-yellow-400 mb-2 text-center">
        Processing your CV with Gemini AI...
      </p>
      <div className="w-full bg-gray-600 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm text-center mt-2">
        {progress < 100 ? "Analyzing and improving your CV..." : "Almost done!"}
      </p>
    </div>
  );
};

export default ProgressIndicator;
