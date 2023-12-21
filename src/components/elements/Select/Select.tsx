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
        // @TODO
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: "8px 6px",
          borderColor: "rgb(212 212 212)",
          borderRadius: "var(--border-radius-assets)",
        }),
      }}
      placeholder={placeholder}
      onChange={(value) => {
        field.onChange(value)
      }}
    />
  );
}

