import DatePicker from 'react-datepicker';
import { useController } from 'react-hook-form';
import { FormFieldType } from '@/helpers/types';
import { Control } from 'react-hook-form/dist/types/form';
import { FormValues } from '@/components/compartments/Form/Form';
import 'react-datepicker/dist/react-datepicker.css';

const dateFormatMatching = {
  'DD/MM/YYYY': 'dd/MM/yyyy',
  'MM/DD/YYYY': 'MM/dd/yyyy',
  'YYYY/MM/DD': 'yyyy/MM/dd',
};

export function DatePickerField({
  data,
  control,
  showTimeSelect,
  dateFormat = 'DD/MM/YYYY',
}: {
  data: FormFieldType;
  control: Control<FormValues>;
  showTimeSelect?: boolean;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
}) {
  const { field } = useController({
    name: data.label,
    control,
    rules: { required: data.required },
  });
  return (
    <DatePicker
      className="w-full border border-slate-200 rounded-theme-button px-4 py-3.5 cursor-pointer focus:outline-none focus:shadow-lg text-inherit placeholder:text-slate-400"
      placeholderText={
        (data.placeholder ? data.placeholder : data.label) +
        (data.required ? '*' : '')
      }
      selected={field.value as Date | null | undefined}
      name={data.label}
      onChange={(date) => {
        field.onChange(date);
      }}
      onFocus={(e) => e.target.blur()} //to prevent edit by typing
      showTwoColumnMonthYearPicker
      showTimeSelect={showTimeSelect}
      showMonthDropdown={!showTimeSelect}
      showYearDropdown={!showTimeSelect}
      dropdownMode="select"
      dateFormat={
        showTimeSelect
          ? `${dateFormatMatching[dateFormat]} - h:mma`
          : dateFormatMatching[dateFormat]
      }
      isClearable
    />
  );
}
