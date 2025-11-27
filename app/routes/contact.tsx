import { useActionData, Form } from "react-router";
import { useEffect, useState } from "react";
import { contactAction } from "~/server/contactAction";
import Toast from "~/components/Toast";

export const action = contactAction;

export default function Contact() {
  const result: any = useActionData();
  const [toast, setToast] = useState<{ message: string; type?: string } | null>(null);
  const errors = result?.errors ?? {};

  useEffect(() => {
    if (result?.success) {
      setToast({ message: result.message, type: "success" });
      console.log("Action data:", result);
    } else if (result?.errors) {
      setToast({ message: "Please fix the errors", type: "error" });
    }
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Contact Us
      </h2>

      {toast && <Toast message={toast.message} type={toast.type as "success" | "error"} onClose={() => setToast(null)} />}
      <Form
        method="post"
        className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 space-y-5"
      >
        <InputField label="Name" name="name" error={errors.name} />
        <InputField label="Email" name="email" type="email" error={errors.email} />
        <InputField label="Phone Number" name="phone" error={errors.phone} />
        <InputField label="Subject" name="subject" error={errors.subject} />
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Inquiry Type
          </label>
          <select
            name="inquiryType"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
            <option value="">Select...</option>
            <option value="general">General</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
          </select>
          {errors.inquiryType && (
            <p className="text-red-600 text-sm mt-1">{errors.inquiryType}</p>
          )}
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            className="w-full px-3 py-2 h-28 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="agree" />
          <label className="text-gray-700">I agree to the terms</label>
        </div>
        {errors.agree && (
          <p className="text-red-600 text-sm -mt-3">{errors.agree}</p>
        )}


        <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transition-colors duration-300 cursor-pointer">
          Submit
        </button>


      </Form>
    </div>
  );
}


function InputField({ label, name, type = "text", error }: any) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error[0]}</p>}
    </div>
  );
}
