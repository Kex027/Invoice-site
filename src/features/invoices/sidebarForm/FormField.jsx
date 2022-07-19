import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

const FormField = ({ formField, register, errors }) => {
  const displayField = (fieldType = "text", patternValue = {}) => (
    <FormControl isInvalid={errors[formField]}>
      <FormLabel htmlFor={formField}>{formField}</FormLabel>
      <Input
        type={fieldType}
        placeholder={formField}
        {...register(formField, {
          required: "This is required",
          minLength: { value: 3, message: "Minimum length should be 3" },
          pattern: patternValue,
        })}
      />
      <FormErrorMessage>
        {errors[formField] && errors[formField].message}
      </FormErrorMessage>
    </FormControl>
  );

  return (
    <>
      {formField === "email"
        ? displayField("email", {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          })
        : formField === "invoiceDate" || formField === "paymentTerms"
        ? displayField("date")
        : displayField()}
    </>
  );
};

export default FormField;
