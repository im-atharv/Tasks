import React, { useRef } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const stripeInputStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#2d3748",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

export default function CardFields() {
  const expiryRef = useRef();
  const cvcRef = useRef();

  const inputWrapperClass =
    "w-full px-3 py-2 border rounded-lg bg-white focus-within:ring-2 focus-within:ring-indigo-500 outline-none";

  const focusNext = (ref) => {
    if (ref?.current) {
      const input = ref.current.querySelector("input, iframe");
      input?.focus();
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className={inputWrapperClass}>
          <CardNumberElement
            options={stripeInputStyle}
            onChange={(e) => {
              if (e.complete) focusNext(expiryRef);
            }}
          />
        </div>
      </div>

      {/* Expiry & CVC */}
      <div className="grid grid-cols-2 gap-4">
        {/* Expiry */}
        <div ref={expiryRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
          <div className={inputWrapperClass}>
            <CardExpiryElement
              options={stripeInputStyle}
              onChange={(e) => {
                if (e.complete) focusNext(cvcRef);
              }}
            />
          </div>
        </div>

        {/* CVC */}
        <div ref={cvcRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <div className={inputWrapperClass}>
            <CardCvcElement options={stripeInputStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}
