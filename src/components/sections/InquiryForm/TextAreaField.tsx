import { FormFieldType } from "@/lib/types"
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "./InquiryForm";

export const TextAreaField: React.FC<{
  data: FormFieldType;
  register: UseFormRegister<FormValues>;
}> = ({ data, register }) => {
  return (
    <textarea
      key={data.id}
      className="block border border-neutral-300 rounded-theme w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-500"
      id={data.label}
      placeholder={
        data.label + (data.required ? "*" : "")
      }
      rows={5}
      {...register(data.label, {
        required: data.required,
      })}
    />
  );
};