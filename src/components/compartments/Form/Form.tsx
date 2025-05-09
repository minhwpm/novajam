'use client';
import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/elements/Button/Button';
import { FormType, FormFieldType } from '@/lib/types';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { SelectField } from './SelectField';
import { DatePickerField } from '@/components/elements/DatePickerField/DatePickerField';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RiErrorWarningLine } from 'react-icons/ri';
import { createFormSubmission } from '@/lib/server-actions';
import * as Toast from '@radix-ui/react-toast';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export type FormValues = {
  [key: string]: string | Date;
};

export const Form: React.FC<{ data: FormType }> = ({ data }) => {
  const {
    internalName,
    fields,
    submitButtonLabel,
    submitButtonVariant,
    submitButtonPosition,
    disclaimer,
    formType,
    dateFormat,
    successMessage,
    errorMessage,
  } = data;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit = async (formData: FormValues) => {
    try {
      const formattedData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        const formattedValue =
          value instanceof Date
            ? value.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
            : value;
        formattedData.append(key, formattedValue as string);
      });

      await createFormSubmission(formattedData);
    } catch (error) {
      console.error('Submission error:', error);
      reset({}, { keepValues: true });
      throw error;
    }
  };

  const renderField = (fieldItem: FormFieldType) => {
    const {
      id,
      label,
      fieldType,
      placeholder,
      required,
      uiWidth,
      helpText,
      hideLabel,
    } = fieldItem;

    return (
      <div
        key={id}
        className={classNames(
          'relative flex flex-col gap-y-2 min-w-max col-span-2 pb-2',
          {
            'sm:col-span-1': uiWidth === 'half-size',
          },
        )}
      >
        {renderLabel(label, placeholder, required, hideLabel)}
        {renderErrorMessages(label)}
        {renderFieldType(fieldType, fieldItem)}
        {helpText && (
          <div className="pl-2 pt-1 text-sm text-inherit/50">{helpText}</div>
        )}
      </div>
    );
  };

  const renderLabel = (
    label: string,
    placeholder: string | null,
    required: boolean,
    hideLabel: boolean,
  ) => {
    if (hideLabel || !placeholder) return null;
    return (
      <div className="flex gap-2 items-center">
        <label className="text-base font-medium">
          {label}
          {required && '*'}
        </label>
      </div>
    );
  };

  const renderErrorMessages = (label: string) => (
    <div className="text-xs text-red-500">
      {errors[label]?.type === 'required' && <p>Required</p>}
      {errors[label]?.type === 'pattern' && (
        <p>Wrong format. Please try again.</p>
      )}
    </div>
  );

  const renderFieldType = (fieldType: string, fieldItem: FormFieldType) => {
    switch (fieldType) {
      case 'select':
        return <SelectField data={fieldItem} control={control} />;
      case 'date':
        return (
          <DatePickerField
            data={fieldItem}
            control={control}
            dateFormat={dateFormat}
          />
        );
      case 'datetime':
        return (
          <DatePickerField
            data={fieldItem}
            control={control}
            showTimeSelect={true}
            dateFormat={dateFormat}
          />
        );
      case 'textarea':
        return <TextAreaField data={fieldItem} register={register} />;
      case 'text':
      case 'tel':
      case 'email':
        return <InputField data={fieldItem} register={register} />;
      default:
        return null;
    }
  };

  const renderToast = () => (
    <Toast.Provider swipeDirection="right" duration={5000}>
      {isSubmitting && (
        <Toast.Root>
          <AiOutlineLoading3Quarters
            className="animate-spin text-primary-600"
            size={50}
          />
        </Toast.Root>
      )}
      {isSubmitted && (
        <Toast.Root
          className="relative bg-white rounded-theme border shadow-lg p-8 data-[state=open]:animate-fadeIn"
          onOpenChange={(open: boolean) => {
            if (!open) {
              reset();
            }
          }}
        >
          <Toast.Close className="absolute top-2 right-2">
            <IoCloseOutline className="cursor-pointer w-10 h-10 p-2 rounded-full text-primary-600 hover:bg-slate-200 transition-all duration-300 ease-in-out" />
          </Toast.Close>
          {isSubmitSuccessful ? (
            <IoMdCheckmarkCircleOutline
              className="text-green-600 m-auto"
              size={50}
            />
          ) : (
            <RiErrorWarningLine className="text-red-600 m-auto" size={50} />
          )}
          <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
            {isSubmitSuccessful
              ? successMessage
              : errorMessage || 'An error occurred while submitting the form.'}
          </Toast.Title>
        </Toast.Root>
      )}
      <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-4 w-96 items-center max-w-full z-50" />
    </Toast.Provider>
  );

  return (
    <>
      <form
        className={classNames(
          'mx-auto w-full p-4 sm:p-6 flex flex-col gap-4 rounded-theme bg-white dark:bg-slate-800/80 dark:backdrop-blur-xl',
          {
            'sm:flex-row items-center': submitButtonPosition === 'right',
            'md:max-w-4xl': fields.length > 1,
            'md:max-w-lg': fields.length === 1,
          },
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={classNames('w-full grid grid-cols-2', {
            'gap-4': fields.length > 1,
          })}
        >
          {fields?.map(renderField)}
          <input
            hidden
            readOnly
            value={internalName}
            {...register('internalName')}
          />
          <input hidden readOnly value={formType} {...register('formType')} />
        </div>
        <div
          className={classNames('flex flex-col items-center', {
            'w-full sm:w-auto': submitButtonPosition === 'right',
          })}
        >
          <Button
            data={{
              label: submitButtonLabel ?? 'Submit',
              href: null,
              withArrow: false,
              variant: submitButtonVariant ?? 'neutral',
              openNewTab: false,
            }}
            size="lg"
            type="submit"
            fullWidth
          />
          {disclaimer && (
            <MarkdownRenderer className="mt-2 prose text-smd text-slate-500/80 dark:prose-invert dark:text-slate-100/30">
              {disclaimer}
            </MarkdownRenderer>
          )}
        </div>
      </form>
      {renderToast()}
    </>
  );
};
