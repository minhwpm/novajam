import classNames from "classnames";
import { useController, UseControllerProps } from "react-hook-form";
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
// import { ReactDatePickerProps } from "@types/react-datepicker"

interface Props extends UseControllerProps {
  className?: string 
  placeholder?: string
  required?: boolean
}

export function DatePicker(props: Props) {
  const { control, name, placeholder, className, required } = props
  const {
    field,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fieldState: { invalid, isTouched, isDirty },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules: {required: required}
  })

  return (
    <ReactDatePicker
      className={classNames(className)}
      placeholderText={placeholder ?? "Select a date"}
      selected={field.value}
      onChange={(date) => {
        field.onChange(date)
        console.log("HELLO", date)
      }}
      dateFormat="d MMM, yyyy"
    />
  );
}