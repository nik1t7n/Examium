// SuccessMessage.tsx

interface Props {
  message: string;
}

const SuccessMessage = ({ message }: Props) => {
  return (
    <div className="bg-green-200 border-l-4 border-green-500 text-green-700 p-4" role="alert">
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  );
};

export default SuccessMessage;
