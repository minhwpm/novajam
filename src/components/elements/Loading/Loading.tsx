import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Loading: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <AiOutlineLoading3Quarters
      className="animate-spin text-primary-600 my-6"
      size={40}
    />
  </div>
);
