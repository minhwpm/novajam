// @TODO duplicated from /standard/loading.tsx
import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen">
      <AiOutlineLoading className="animate-spin" size={40} />
    </div>
  );
}