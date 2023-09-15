'use client'
import { useAppSelector } from "@/redux/hooks";
import classNames from "classnames";

const CURRENCY_UNIT = '$'
const SHIPPING_FEE = 5

const Order = () => {
  const { itemsList, total, quantity } = useAppSelector(s => s.cart)
  return (
    <div>
      <h3 className="mt-10 mb-2 text-3xl font-heading">
        Your Order 
        <span>
          {`(${quantity} items)`}
        </span>
      </h3>
      <div className={classNames("flex", "flex-col-reverse")}>
        {itemsList.map((item) => (
          <div key={item.id} className={classNames("grid", "grid-cols-4", "py-6", "border-b-1")}>
            <div className={classNames("col-span-2")}>{item.name}</div>
            <div className={classNames("col-span-1", "text-rose-500")}>x {item.subQuantity}</div>
            <div className={classNames("col-span-1", "text-right", "text-lg", "font-medium")}>
              {CURRENCY_UNIT}{item.subTotal}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className={classNames("py-3", "flex", "flex-col", "gap-2")}>
        <div className={classNames("flex", "justify-between")}>
          <span className={classNames("font-medium")}>Subtotal</span>
          <span>{CURRENCY_UNIT}{total}</span>
        </div>
        <div className={classNames("flex", "justify-between")}>
          <span className={classNames("font-medium")}>Shipping cost</span>
          <span>{CURRENCY_UNIT}{total > 0 ? SHIPPING_FEE : 0}</span>
        </div>
        <div className={classNames("flex", "justify-between", "mb-4")}>
          <span className={classNames("text-lg", "font-semibold")}>Total</span>
          <span className={classNames("text-2xl", "font-semibold")}>${total + (total > 0 ? SHIPPING_FEE : 0)}</span>
        </div>
      </div>
    </div>
  )
}

export default Order