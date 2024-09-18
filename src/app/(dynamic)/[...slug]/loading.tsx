import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen">
      <AiOutlineLoading3Quarters
        className="animate-spin text-primary-600"
        size={40}
      />
    </div>
  );
}
