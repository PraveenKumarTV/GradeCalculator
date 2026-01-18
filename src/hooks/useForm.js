import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        validate(name, value);
    };

    const validate = (name, value) => {
        let error = '';
        if (value < 0) {
            error = 'Value cannot be negative';
        } else if (name === 'internalMarks' && value > 70) {
            error = 'Internal marks cannot exceed 70';
        } else if (name === 'externalMarks' && value > 30) {
            error = 'External marks cannot exceed 30';
        }
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        resetForm,
    };
};

export default useForm;