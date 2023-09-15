'use client'
import { useForm } from "react-hook-form";

interface SubscribeFormProps {
  emailPlaceholder?: string
  buttonText?: string
}

type FormValues = {
  email: string;
};

const SubscribeForm: React.FC<SubscribeFormProps> = ({ 
  emailPlaceholder = "Your email", 
  buttonText = "Subscribe",
}) => {
  // @TODO validate this Form
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  function onSubmit (data: FormValues) {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="flex"
    >
      <input
        className="block border rounded-l-sm w-full px-4 py-3 focus:outline-none focus:shadow-lg"
        type="text"
        id="email"
        {...register("email", { required: true })}
        placeholder={emailPlaceholder}
      />
      <input
        type="submit"
        className="px-5 bg-primary-500 rounded-r-sm text-white"
        value={buttonText}
      />
    </form>
  )
}

export default SubscribeForm