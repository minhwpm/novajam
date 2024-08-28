import classNames from "classnames"
import { FormFieldType } from "@/helpers/types"
import { getRegEx } from "@/helpers/utils";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "./Form";

export const InputField: React.FC<{
  data: FormFieldType;
  register: UseFormRegister<FormValues>;
}> = ({ data, register }) => {
  return (
    <input
      className={classNames(
        "block border border-neutral-300 rounded-theme-button w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-500"
      )}
      type={data.fieldType}
      {...register(data.label, {
        required: data.required,
        pattern: getRegEx(data.fieldType),
      })}
      placeholder={(data.placeholder ? data.placeholder : data.label) + (data.required ? "*" : "")}
    />
  );
};