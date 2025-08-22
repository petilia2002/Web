import { useState, useEffect } from "react";

export const useValidation = (
  inputFields,
  getInitialData,
  fieldValidators,
  formValidators,
  callback,
  role
) => {
  const [formData, setFormData] = useState(getInitialData);
  const [errors, setErrors] = useState({});
  const [isDirtyMap, setIsDirtyMap] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const initialData = getInitialData();
    const newErrors = {};
    inputFields.forEach((field) => {
      const error = validateField(field.name, initialData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });
    setFormData(initialData);
    setErrors(newErrors);
    setIsDirtyMap({});
    setIsSubmitted(false);
  }, [role]);

  const validateField = (name, value) => {
    for (let validator of fieldValidators[name]) {
      const result = validator(value);
      if (result) {
        return result;
      }
    }
    return null;
  };

  const isFormValid = (errors) => {
    return Object.values(errors).every((errorMsg) => !errorMsg);
  };

  const validateForm = () => {
    let newErrors = errors;
    Object.values(formValidators).forEach((validator) => {
      const errorObj = validator(formData);
      if (errorObj) {
        newErrors = { ...newErrors, ...errorObj };
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    const errorMessage = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = (e) => {
    setIsDirtyMap((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (isFormValid(newErrors)) {
      callback();
    }
    setIsSubmitted(true);
  };

  return {
    formData,
    errors,
    isDirtyMap,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
