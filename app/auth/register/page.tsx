"use client";

import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { name, email, password } = values;

  const formErrors: string[] = [];

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        crossOrigin={undefined}
        value={name}
        onChange={handleChange}
      />
      <Input
        name="email"
        label="Email"
        crossOrigin={undefined}
        value={email}
        onChange={handleChange}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        crossOrigin={undefined}
        value={password}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        Register
      </Button>
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