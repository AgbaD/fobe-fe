import { useEffect, useState } from "react";

interface useFormProps {
  initialValues: Record<string, any>;
  validationSchema: any;
  onSubmit: (values: useFormProps["initialValues"]) => void;
}

function useForm({
  initialValues = {},
  validationSchema,
  onSubmit,
}: useFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState<string[]>([]);

  useEffect(() => {
    validate();
  }, [JSON.stringify(values)]);

  function validate() {
    if (!validationSchema) return true;
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      let errorDump: any = {};
      if (!err.inner) return;
      err.inner.forEach((innerError: any) => {
        errorDump[innerError.path] = innerError.message;
      });
      setErrors(errorDump);
      return false;
    }
  }

  function handleInputChange({ target: { name, value, checked, type } }: any) {
    setFieldValue(name, type === "checkbox" ? checked : value);
  }

  function setFieldValue(name: string, value: any) {
    setValues((values) => ({ ...values, [name]: value }));
  }

  function getFieldProps(name: string) {
    return {
      name,
      value: values[name],
      onChange: handleInputChange,
      onBlur: () =>
        setTouched((prev) => (prev?.includes(name) ? prev : [...prev, name])),
      errorMessage: touched.includes(name) ? errors[name] : "",
      onFocus: () => null,
    };
  }

  // console.log(touched, errors);

  function handleSubmit(e: any) {
    e.preventDefault();
    setTouched(Object.keys(initialValues));
    const isValid = validate();
    if (isValid) onSubmit(values);
  }

  return {
    getFieldProps,
    handleSubmit,
    errors,
    values,
  };
}

export default useForm;
