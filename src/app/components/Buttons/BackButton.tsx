const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 bg-gray-600 py-2 px-4 rounded-2xl hover:bg-gray-500 transition-all cursor-pointer"
    >
      Back
    </button>
  );
};

export default BackButton;
