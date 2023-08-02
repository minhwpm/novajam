import Cart from "@/components/sections/Cart/Cart";
import classNames from "classnames";

export default function CartPage() {
  return (
    <main className="min-h-screen">
      <div className={classNames("container", "px-4", "mx-auto", "mt-32")}>
        <Cart />
      </div>
    </main>
  )
}
