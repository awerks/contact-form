import { useState } from "react";
import { useForm } from "react-hook-form";

interface CalculateFormValues {
  firstName: string;
  lastName: string;
  email: string;
  queryType: "general-enquiry" | "support-request";
  message: string;
  consent: boolean;
}

function CalculateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculateFormValues>();
  const [success, setSuccess] = useState(false);

  if (success) {
    return <h1>Success!</h1>;
  }

  return (
    <>
      <section className="bg-white [&_label]:block">
        <form
          onSubmit={handleSubmit((data) => {
            setSuccess(true);
            console.log("Form submitted");
            console.log(JSON.stringify(data, null, 2));
          })}
          className="flex flex-col gap-4 p-4"
        >
          <h1>Contact us</h1>
          <div className="flex gap-4">
            <div>
              <label htmlFor="firstName">First name *</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                id="firstName"
                type="text"
              ></input>
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last name *</label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                id="lastName"
                type="text"
              ></input>
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <label htmlFor="email">Email address *</label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <label htmlFor="query-type">Query type</label>
          <div className="flex gap-4">
            <input
              type="radio"
              {...register("queryType", { required: "Query type is required" })}
              id="general-enquiry"
              value="general-enquiry"
            />
            <input
              type="radio"
              {...register("queryType", { required: "Query type is required" })}
              id="support-request"
              value="support-request"
            />
          </div>
          {errors.queryType && (
            <p className="text-sm text-red-500">{errors.queryType.message}</p>
          )}
          <label htmlFor="message">Message</label>
          <textarea id="message"></textarea>
          <div>
            <input
              {...register("consent", { required: "Consent is required" })}
              type="checkbox"
              id="consent"
            />
            <label htmlFor="consent" className="inline!">
              I consent to being contacted by the team *
            </label>
            {errors.consent && (
              <p className="text-sm text-red-500">{errors.consent.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-cm-green-600 rounded px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default CalculateForm;
