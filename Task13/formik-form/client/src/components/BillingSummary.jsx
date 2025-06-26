import { useEffect, useState } from "react";

export default function BillingSummary({ values, amount }) {
  const [billingInfo, setBillingInfo] = useState(null);

  useEffect(() => {
    if (values) {
      setBillingInfo({
        Name: `${values.firstName} ${values.lastName}`,
        Email: values.email,
        Address: `${values.streetAddress}, ${values.city}, ${values.state}, ${values.country} - ${values.addressZip}`,
        Payment: `₹${amount.toLocaleString("en-IN", {
          minimumFractionDigits: 0,
        })}`,
      });
    }
  }, [values, amount]);

  if (!billingInfo) return null;

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-semibold mb-2">Billing Summary</h3>
      <ul className="space-y-1 text-gray-700">
        {Object.entries(billingInfo).map(([key, val]) => (
          <li key={key}>
            <strong>{key}:</strong> {val}
          </li>
        ))}
      </ul>
    </div>
  );
}
