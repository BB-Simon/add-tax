import { FormikHelpers, Form, useFormik } from 'formik'
import React, { FC, useState } from 'react'
import FormDetails from '../FormDetails'

interface Values {
    applicable_items: number[]
    applied_to: string
    name: string
    rate: number
}

const AddTax: FC = () => {
    const initialValues: Values = {
        applicable_items: [],
        applied_to: '',
        name: '',
        rate: 0
    }
    const [isEditing, setIsEditing] = useState<Boolean>(false)

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            console.log('values', values);

        }
    })
    const {
        isSubmitting,
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        resetForm
    } = formik;

    return (
        <div className="my-20">
            <form onSubmit={handleSubmit}>
                <FormDetails
                    title="Add Tax"
                    formList={[
                        {
                            value: values.name,
                            setValue: (value) => {
                                handleChange(value)
                                setIsEditing(true);
                            },
                            label: "",
                            name: "name",
                            placeholder: "Tax",
                            inputStyles: "sd__md-input-box",
                            inputType: "input",
                            error: "",
                        },
                        {
                            value: values.rate,
                            setValue: (value) => {
                                handleChange(value)
                                // setIsEditing(true);
                            },
                            label: "",
                            name: "rate",
                            placeholder: "Tax",
                            inputStyles: "sd__md-input-box",
                            inputType: "input",
                            error: "",
                        },
                        {
                            value: "all",
                            setValue: (value) => {
                                handleChange(value)
                                setIsEditing(true);
                            },
                            checked: values.applied_to === "all",
                            label: "Apply to all items in collection",
                            name: "applied_to",
                            inputType: "radio",
                            error: "",
                        },
                        {
                            value: "some",
                            setValue: (value) => {
                                handleChange(value)
                                setIsEditing(true);
                            },
                            checked: values.applied_to === "some",
                            label: "Apply to specific items",
                            name: "applied_to",
                            inputType: "radio",
                            error: "",
                        },
                    ]}
                />
            </form>
        </div>
    )
}

export default AddTax
