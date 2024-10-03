'use client';
import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/elements/Button/Button';
import { FormType } from '@/helpers/types';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { SelectField } from './SelectField';
import { DatePickerField } from '@/components/elements/DatePickerField/DatePickerField';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RiErrorWarningLine } from 'react-icons/ri';
import { createFormSubmission } from '@/helpers/server-actions/createFormSubmission';
import * as Toast from '@radix-ui/react-toast';

export type FormValues = {
  [x: string]: string | Date;
};

export const Form: React.FC<{ data: FormType; darkMode?: boolean }> = ({
  data,
}) => {
  const {
    title,
    fields,
    submitButton,
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

  function onSubmit(data: FormValues) {
    const formData = new FormData();
    for (const prop in data) {
      if (data[prop] instanceof Date) {
        data[prop] = data[prop]
          ?.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
          .toString();
      }
      formData.append(prop, data[prop] as string);
    }
    return createFormSubmission(formData)
      .then((result) => result)
      .catch((e) => {
        console.error(e);
        return e;
      });
  }

  return (
    <>
      <form
        className={classNames(
          'p-4 lg:p-8 flex flex-wrap rounded-theme dark:bg-white dark:text-slate-700 self-end',
          { 'gap-4': fields.length > 1 },
          { 'gap-1': fields?.length === 1 },
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields?.length > 0 &&
          fields.map((fieldItem) => (
            <div
              key={fieldItem.id}
              className={classNames(
                'relative flex flex-col gap-2 w-full max-w-xl',
                {
                  'sm:basis-1/3 sm:grow sm:shrink':
                    fieldItem.uiWidth === 'half-size',
                },
              )}
            >
              <div className="flex gap-2 items-center">
                {fieldItem.placeholder && (
                  <div className={classNames('text-smd')}>
                    {fieldItem.label}
                  </div>
                )}
                <div className="text-xs text-red-500">
                  {errors[fieldItem.label]?.type === 'required' && (
                    <p>required * </p>
                  )}
                  {errors[fieldItem.label]?.type === 'pattern' && (
                    <p>Wrong format. Please try again. </p>
                  )}
                </div>
              </div>
              {fieldItem.fieldType === 'select' && (
                <SelectField data={fieldItem} control={control} />
              )}
              {fieldItem.fieldType === 'date' && (
                <DatePickerField
                  data={fieldItem}
                  control={control}
                  dateFormat={dateFormat}
                />
              )}
              {fieldItem.fieldType === 'datetime' && (
                <>
                  <DatePickerField
                    data={fieldItem}
                    control={control}
                    showTimeSelect={true}
                    dateFormat={dateFormat}
                  />
                </>
              )}
              {fieldItem.fieldType === 'textarea' && (
                <TextAreaField data={fieldItem} register={register} />
              )}
              {fieldItem.fieldType !== 'textarea' &&
                fieldItem.fieldType !== 'select' &&
                fieldItem.fieldType !== 'date' &&
                fieldItem.fieldType !== 'datetime' && (
                  <InputField data={fieldItem} register={register} />
                )}
              {fieldItem.helpText && (
                <div
                  className={classNames('pl-2 pt-1 text-sm text-inherit/50')}
                >
                  {fieldItem.helpText}
                </div>
              )}
            </div>
          ))}
        <input hidden readOnly value={title} {...register('title')} />
        <input hidden readOnly value={formType} {...register('formType')} />

        <div className="mt-2 w-full">
          {submitButton ? (
            <Button
              data={submitButton}
              size="lg"
              type="submit"
              fullWidth={true}
            />
          ) : (
            <Button
              data={{
                buttonLabel: 'Submit',
                url: null,
                withArrow: false,
                buttonVariant: 'black',
                openNewTab: false,
              }}
              size="lg"
              type="submit"
              fullWidth={true}
            />
          )}
        </div>
      </form>
      {/* @TODO move these Toasts below into a Portal  */}
      {isSubmitting && (
        <Toast.Provider swipeDirection="right">
          <Toast.Root className="data-[state=open]:animate-fadeIn">
            <AiOutlineLoading3Quarters
              className="animate-spin text-primary-600"
              size={50}
            />
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-6 m-0 w-24 max-w-full z-50" />
        </Toast.Provider>
      )}
      {isSubmitted && isSubmitSuccessful && (
        <Toast.Provider swipeDirection="right" duration={5000}>
          <Toast.Root
            className="relative bg-white rounded-theme border shadow-lg p-8 data-[state=open]:animate-fadeIn"
            onOpenChange={(open: boolean) => {
              if (!open) {
                reset();
              }
            }}
          >
            <Toast.Close className="absolute top-2 right-2">
              <IoCloseOutline className="cursor-pointer ml-auto w-10 h-10 p-2 rounded-full text-primary-600 hover:bg-slate-200 transition-all duration-300 ease-in-out" />
            </Toast.Close>
            <IoMdCheckmarkCircleOutline
              className="text-green-600 m-auto"
              size="50"
            />
            <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
              {successMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col m-0 p-4 md:p-6 w-96 max-w-full z-[999999999]" />
        </Toast.Provider>
      )}
      {isSubmitted && !isSubmitSuccessful && (
        <Toast.Provider swipeDirection="right" duration={5000}>
          <Toast.Root className="relative bg-slate-100 rounded-theme border border-slate-300 shadow-lg p-8 data-[state=open]:animate-fadeIn">
            <Toast.Close className="absolute top-2 right-2">
              <IoCloseOutline className="cursor-pointer ml-auto w-10 h-10 p-2 rounded-full text-primary-600 hover:bg-slate-200 transition-all duration-300 ease-in-out" />
            </Toast.Close>
            <RiErrorWarningLine className="text-red-600 m-auto" size="50" />
            <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
              {errorMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col m-0 p-4 md:p-6 w-96 max-w-full z-[999999999]" />
        </Toast.Provider>
      )}
    </>
  );
};
