import { FormFieldType } from '@/helpers/types';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FormValues } from './Form';

export const TextAreaField: React.FC<{
  data: FormFieldType;
  register: UseFormRegister<FormValues>;
}> = ({ data, register }) => {
  return (
    <textarea
      key={data.id}
      className="block border border-slate-200 rounded-theme w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-inherit placeholder:text-slate-400"
      id={data.label}
      placeholder={
        (data.placeholder ? data.placeholder : data.label) +
        (data.required ? '*' : '')
      }
      rows={5}
      {...register(data.label, {
        required: data.required,
      })}
    />
  );
};
