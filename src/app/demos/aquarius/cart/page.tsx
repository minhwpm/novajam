'use client'
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import TrashCan from '@/components/icons/TrashCan';
import { cartActions } from '@/redux/cartSlice';
import Button from "@/components/elements/Button/Button";

const CURRENCY_UNIT = '$'

export default function Cart() {
  const { itemsList, total, quantity } = useSelector(s => {
    console.log(s)
    return s.cart
  })
  const dispatch = useDispatch();
  const shippingFee = 5
  return (
    <main className="min-h-screen">
      {/* <div className="container px-4 mx-auto flex flex-wrap items-center justify-between"> */}
      <div className={classNames("container", "px-4", "mx-auto", "mt-32")}>
        <h2 className={classNames("text-xl", "font-semibold")}>
          Your shopping cart
        </h2>
        <p>
          {quantity === 0 && 'There is no item.'}
          {quantity === 1 && 'There is 1 item.'}
          {quantity > 1 && `There are ${quantity} items.`}
        </p>
        <section className={classNames("grid", "grid-cols-3", "gap-12")}>
          <div className={classNames("col-span-3", "md:col-span-2", "flex", "flex-col-reverse")}>
            {itemsList.map((item, idx) => (
              <div key={item.id} className={classNames("grid", "grid-rows-4", "grid-cols-3", "py-6", "border-b-1")}>
                <div className={classNames("col-span-2", "row-span-4")}>{item.name}</div>
                <div className={classNames("col-span-1", "row-span-1", "text-right")}>
                  <span className={classNames("px-2", "py-1", "border-1", "cursor-pointer")} onClick={() => {
                    if (item.subQuantity === 1) {
                      dispatch(cartActions.openDeleteWarnings({
                        index: idx,
                      }))
                      return
                    }
                    dispatch(cartActions.removeFromCart({
                      index: idx,
                      id: item.id,
                      name: item.name,
                      price: item.price
                    }))
                  }}>
                    -
                  </span>
                  <span className={classNames("px-2", "py-1", "border-t-1", "border-b-1")}>{item.subQuantity}</span>
                  <span className={classNames("px-2", "py-1", "border-1", "cursor-pointer")} onClick={() => {
                    // console.log({id: item.id, quantity: item.quantity - 1})
                    dispatch(cartActions.addToCart({
                      index: idx,
                      id: item.id,
                      name: item.name,
                      price: item.price
                    }))
                  }}>
                    +
                  </span>
                </div>
                <div className={classNames("col-span-1", "row-span-1", "text-right", "text-lg", "font-medium")}>
                  {CURRENCY_UNIT}{item.subTotal}
                </div>
                <div className={classNames("col-span-1", "row-span-1", "text-right", "text-sm", "text-slate-500")}>
                  {item.subQuantity > 1 && `unit price: ${CURRENCY_UNIT}${item.price}`}
                </div>
                <div className={classNames("col-span-1", "row-span-1", "text-right")}>
                  <span className={classNames("cursor-pointer")} onClick={() => {
                    dispatch(cartActions.openDeleteWarnings({
                      index: idx,
                    }))
                  }}>
                    <TrashCan />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={classNames("col-span-3", "md:col-span-1", "border-1", "px-4", "py-5")}>
            <h4 className={classNames("text-xl", "font-semibold", "mb-3")}>Order summary</h4>
            <hr />
            <div className={classNames("mt-3", "flex", "justify-between")}>
              <span className={classNames("font-medium")}>Subtotal</span>
              <span>{CURRENCY_UNIT}{total}</span>
            </div>
            <div className={classNames("mb-3", "flex", "justify-between")}>
              <span className={classNames("font-medium")}>Shipping cost</span>
              <span>{CURRENCY_UNIT}{total > 0 ? shippingFee : 0}</span>
            </div>
            <hr />
            <div className={classNames("flex", "justify-between", "mb-4")}>
              <span className={classNames("text-lg", "font-semibold")}>Total</span>
              <span className={classNames("text-rose-600", "text-2xl", "font-semibold")}>${total + (total > 0 ? shippingFee : 0)}</span>
            </div>
            
            <Button url="/payment">
              Purchase
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
