"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";
import AuthFormContainer from "@components/AuthFormContainer";
import { filterFormikErrors } from "@/app/utils/formikHelpers";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, actions) => {
      const loginRes = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (loginRes?.error === "CredentialsSignin") {
        toast.error("Email or password mismatch!");
      }

      if (!loginRes?.error) {
        router.refresh();
      }
    },
  });

  const errorsToRender = filterFormikErrors(errors, touched, values);

  type valueKeys = keyof typeof values;

  const { email, password } = values;
  const error = (name: valueKeys) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="email"
        label="Email"
        value={email}
        crossOrigin={undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("email")}
      />
      <Input
        name="password"
        label="Password"
        value={password}
        crossOrigin={undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password")}
        type="password"
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Login
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/register">Register</Link>
        <Link href="/auth/forget-password">Forget password</Link>
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
    </AuthFormContainer>
  );
}
