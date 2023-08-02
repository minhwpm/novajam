import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import TrashCan from '@/components/icons/TrashCan';
import { cartActions } from '@/redux/cartSlice';
import Button from "@/components/elements/Button/Button";
import CheckoutForm from "@/components/elements/CheckoutForm/CheckoutForm";
import Order from "@/components/elements/Order/Order";

export default function Checkout() {
  return (
    <main className="min-h-screen">
      <div className={classNames("container", "px-4", "py-20", "mx-auto")}>
        <h2 className="mb-10 font-heading text-5xl text-center">
          Checkout
        </h2>

        <div className="grid lg:grid-cols-2 gap-7">
          <CheckoutForm />
          <Order />
        </div>
      </div>
    </main>
  )
}
