import ReactSelect from 'react-select';
import { useController } from 'react-hook-form';
import { FormFieldType } from '@/helpers/types';
import { Control } from 'react-hook-form/dist/types/form';
import { FormValues } from './Form';
import { useEffect, useState } from 'react';

export const SelectField: React.FC<{
  data: FormFieldType;
  control: Control<FormValues>;
}> = ({ data, control }) => {
  const { field } = useController({
    name: data.label,
    control,
    rules: { required: data.required },
  });
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // for fixing hydration warnings and errors
    setIsClient(true);
  }, []);

  return isClient ? (
    <ReactSelect
      className="w-full"
      name={data.label}
      options={data.options?.map((option) => {
        return {
          label: option,
          value: option,
        };
      })}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          padding: '8px 6px',
          borderColor: '@apply border-slate-200',
          borderRadius: 'var(--border-radius-theme-button)',
        }),
      }}
      placeholder={
        <div className="text-slate-400">
          {(data.placeholder ? data.placeholder : data.label) +
            (data.required ? '*' : '')}
        </div>
      }
      onChange={(selectedOption) => {
        field.onChange(selectedOption?.value);
      }}
    />
  ) : null;
};
