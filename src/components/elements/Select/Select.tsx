import classNames from "classnames";
import ReactSelect from "react-select";
import { useController, UseControllerProps } from "react-hook-form";
import React from "react";

interface Props extends UseControllerProps {
  className?: string 
  placeholder?: React.ReactNode
  required?: boolean
  options?: Array<{
    [x: string]: string
  }>
}

export function Select(props: Props) {
  const { control, name, options, className, required, placeholder } = props
  const {
    field,
  } = useController({
    name,
    control,
    rules: {required: required}
  })

  return (
    <ReactSelect
      className={classNames(className)}
      options={options}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: "8px 6px",
          borderRadius: "6px",
        }),
      }}
      placeholder={placeholder}
      onChange={(value) => {
        field.onChange(value)
        console.log("HELLO", value)
      }}
    />
  );
}

