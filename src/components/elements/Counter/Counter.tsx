import classNames from "classnames";
import { useState, forwardRef } from "react";

const Counter = forwardRef(function Counter({ initalCount } : { initalCount?: number}, ref) {
  const [count, setQuantity] = useState(initalCount ?? 1)

  return (
    <div className={classNames("h-10")}>
      <span
        className={classNames(
          "inline-block",
          "w-7",
          "text-center",
          "px-2",
          "py-1",
          "border-1",
          "cursor-pointer"
        )}
        onClick={() => {
          if (count >=2) setQuantity(count - 1)
        }}
      >
        -
      </span>
      <span
        className={classNames(
          "inline-block",
          "w-8",
          "text-center",
          "px-2",
          "py-1",
          "border-t-1",
          "border-b-1"
        )}
        ref={ref}
      >
        {count}
      </span>
      <span
        className={classNames(
          "inline-block",
          "w-7",
          "text-center",
          "px-2",
          "py-1",
          "border-1",
          "cursor-pointer"
        )}
        onClick={() => setQuantity(count + 1)}
      >
        +
      </span>
    </div>
  );
})

export default Counter