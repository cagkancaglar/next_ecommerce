"use client";
import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";
import { filterFormikErrors } from "@/app/utils/formikHelpers";
import { toast } from "react-toastify";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Register() {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Password is required!"),
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const { message, error } = (await res.json()) as {
        message: string;
        error: string;
      };

      if (res.ok) {
        toast.success(message);
        await signIn("credentials", { email, password });
      }

      if (!res.ok && error) {
        toast.error(error);
      }

      action.setSubmitting(false);
    },
  });

  const { name, email, password } = values;

  type valueKeys = keyof typeof values;
  const error = (name: valueKeys) => {
    return errors[name] && touched[name] ? true : false;
  };

  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        crossOrigin={undefined}
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("name")}
      />
      <Input
        name="email"
        label="Email"
        crossOrigin={undefined}
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("email")}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        crossOrigin={undefined}
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password")}
      />
      <Button disabled={isSubmitting} type="submit" className="w-full">
        Register
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/forget-password">Forget password</Link>
      </div>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
