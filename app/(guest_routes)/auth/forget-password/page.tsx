"use client";
import React from "react";
import FormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { filterFormikErrors } from "@/app/utils/formikHelpers";
import Link from "next/link";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgetPassword() {
  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, actions) => {},
  });

  const errorsToRender = filterFormikErrors(errors, touched, values);

  type valueKeys = keyof typeof values;

  const { email } = values;
  const error = (name: valueKeys) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <FormContainer title="Forget Password" onSubmit={handleSubmit}>
      <Input
        name="email"
        label="Email"
        value={email}
        crossOrigin={undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("email")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Send Link
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </div>
      <div className="">
        {errorsToRender.map((item) => {
          return (
            <div
              key={item}
              className="space-x-1 flex items-center text-red-500"
            >
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{item}</p>
            </div>
          );
        })}
      </div>
    </FormContainer>
  );
}
