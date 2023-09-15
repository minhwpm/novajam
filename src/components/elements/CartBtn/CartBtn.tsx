import { ShoppingBag } from "@/components/icons/ShoppingBag"
import { useAppSelector } from "@/redux/hooks";
import classNames from "classnames"
import Link from "next/link";

const CartBtn = () => {
  const { quantity } = useAppSelector(s => s.cart);
  return (
    <Link href="/demos/aquarius/cart" className="cursor-pointer relative">
      <ShoppingBag />
      { quantity > 0 && (
        <div className={classNames("absolute", "w-4", "h-4", "rounded-full", "flex", "justify-center", "items-center", "-top-1", "-right-3", "text-xs", "text-white", "bg-black")}>
          {quantity}
        </div>
      )}
    </Link>
  )
}

export default CartBtn