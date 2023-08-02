'use client'
import Button from "../Button/Button"
import  { useForm }  from  "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  orderNotes: string;
  paymentMethod: 'cod' | 'creditCard' | 'paypal' | 'stripe'
};

const CheckoutForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        {errors.firstName && 
          <p className="">
            <span className="font-semibold">First Name</span> is required
          </p>
        }
        {errors.lastName && 
          <p className="">
            <span className="font-semibold">Last Name</span> is required
          </p>
        }

        {errors.address && 
          <p className="">
            <span className="font-semibold">Address</span> is required
          </p>
        }
        {errors.phone && 
          <p className="">
            <span className="font-semibold">Phone</span> is required
          </p>
        }
        {errors.paymentMethod && 
          <p className="">
            <span className="font-semibold">Payment method</span> is required
          </p>
        }
      </div>
      <h3 className="mt-10 mb-2 text-3xl font-heading">
        Billing Details
      </h3>
      <div>
        <label className="block mb-1" htmlFor="firstName">
          First Name *
        </label>
        <input
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          type="text"
          id="firstName"
          {...register("firstName", { required: true })}
        />
      </div>

      <div>
        <label className="block mb-1" htmlFor="lastName">
          Last Name *
        </label>
        <input
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
        />
      </div>

      <div>
        <label className="block mb-1" htmlFor="address">
          Address *
        </label>
        <input
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          type="text"
          id="address"
          {...register("address", { required: true })}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-5">
        <div>
          <label className="block mb-1" htmlFor="phone">
            Phone *
          </label>
          <input
            className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
            type="text"
            id="phone"
            {...register("phone", { required: true })}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
      </div>
      <div className="">
        <label className="block mb-1" htmlFor="orderNotes">
          Order Notes
        </label>
        <textarea
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          id="orderNotes"
          {...register("orderNotes")}
        />
      </div>

      <h3 className="mt-10 mb-2 text-3xl font-heading">
        Payment Method
      </h3>
      <div className="flex items-center gap-3">
        <input
          className="peer appearance-none grid place-content-center w-4 h-4 border border-slate-300 rounded-full before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full checked:before:bg-primary-500"
          type="radio"
          id="cod"
          value="cod"
          {...register("paymentMethod", { required: true})}
        />
        <label className="text-slate-500 peer-checked:text-black" htmlFor="cod">COD</label>
      </div>
      <div className="flex items-center gap-3">
        <input
          className="peer appearance-none grid place-content-center w-4 h-4 border border-slate-300 rounded-full before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full checked:before:bg-primary-500"
          type="radio"
          id="creditCard"
          value="creditCard"
          {...register("paymentMethod", { required: true})}
        />
        <label className="text-slate-500 peer-checked:text-black" htmlFor="creditCard">Credit card</label>
      </div>
      
      <div className="flex items-center gap-3">
        <input
          className="peer appearance-none grid place-content-center w-4 h-4 border border-slate-300 rounded-full before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full checked:before:bg-primary-500"
          type="radio"
          id="paypal"
          value="paypal"
          {...register("paymentMethod", { required: true})}
        />
        <label className="text-slate-500 peer-checked:text-black" htmlFor="paypal">PayPal</label>
      </div>
      <div className="flex items-center gap-3">
        <input
          className="peer appearance-none grid place-content-center w-4 h-4 border border-slate-300 rounded-full before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full checked:before:bg-primary-500"
          type="radio"
          id="stripe"
          value="stripe"
          {...register("paymentMethod", { required: true})}
        />
        <label className="text-slate-500 peer-checked:text-black" htmlFor="stripe">Stripe</label>
      </div>
      <div className="mt-5 flex flex-col">
        <Button type="submit">
          PLACE ORDER
        </Button>
      </div>
    </form>
  )
}

export default CheckoutForm