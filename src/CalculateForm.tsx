import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import IconSuccessCheck from "../assets/images/icon-success-check.svg";

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
    reset,
    formState: { errors },
  } = useForm<CalculateFormValues>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-cm-gray-900 space-y-2 rounded-lg p-4 text-white`}
          >
            <div className="flex items-center gap-2">
              <img src={IconSuccessCheck} width="20" height="21"></img>
              <h2 className="text-lg font-bold">Success</h2>
            </div>
            <p>Thanks for completing the form! We'll be in touch soon!</p>
          </div>
        ),
        { duration: 2500 },
      );
      const timer = setTimeout(() => {
        setSuccess(false);
        reset();
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success, reset]);

  return (
    <>
      <Toaster position="top-center" />
      <section className="accent-cm-green-600 rounded-xl bg-white p-4 max-md:mt-16">
        <form
          onSubmit={handleSubmit((data) => {
            setSuccess(true);
            console.log("Form submitted");
            console.log(JSON.stringify(data, null, 2));
          })}
          className="space-y-5 p-4"
        >
          <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="space-y-2">
              <label htmlFor="firstName">
                First name <span>*</span>
              </label>
              <input
                {...register("firstName", {
                  required: "This field is required",
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
            <div className="space-y-2">
              <label htmlFor="lastName">
                Last name <span>*</span>
              </label>
              <input
                {...register("lastName", {
                  required: "This field is required",
                })}
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
          <div className="space-y-2">
            <label htmlFor="email">
              Email address <span>*</span>
            </label>
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              id="email"
              type="text"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="query-type">
              Query type <span>*</span>
            </label>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="outline-cm-gray-500 hover:outline-cm-green-600 has-[:checked]:bg-cm-green-200 flex grow rounded-md outline transition-colors">
                <label
                  htmlFor="general-enquiry"
                  className="flex w-full cursor-pointer items-center gap-x-3 px-4 py-3"
                >
                  <input
                    type="radio"
                    {...register("queryType", {
                      required: "Please select a query type",
                    })}
                    id="general-enquiry"
                    value="general-enquiry"
                  />
                  General enquiry
                </label>
              </div>
              <div className="outline-cm-gray-500 hover:outline-cm-green-600 has-[:checked]:bg-cm-green-200 flex grow rounded-md outline transition-colors">
                <label
                  htmlFor="support-request"
                  className="flex w-full cursor-pointer items-center gap-x-3 px-4 py-3"
                >
                  <input
                    type="radio"
                    {...register("queryType", {
                      required: "Please select a query type",
                    })}
                    id="support-request"
                    value="support-request"
                    className="accent-cm-green-600"
                  />
                  Support request
                </label>
              </div>
            </div>
            {errors.queryType && (
              <p className="text-sm text-red-500">{errors.queryType.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="message">
              Message <span>*</span>
            </label>
            <textarea id="message" className="min-h-[7em]"></textarea>
          </div>
          <div>
            <input
              {...register("consent", {
                required:
                  "To submit this form, please consent to being contacted",
              })}
              type="checkbox"
              id="consent"
              className="mr-2"
            />
            <label htmlFor="consent" className="inline!">
              I consent to being contacted by the team <span>*</span>
            </label>
            {errors.consent && (
              <p className="text-sm text-red-500">{errors.consent.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-cm-green-600 hover:bg-cm-gray-900 focus-visible:bg-cm-gray-900 mt-4 w-full cursor-pointer rounded-md px-4 py-2 text-white transition-colors"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default CalculateForm;
