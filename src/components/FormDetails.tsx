import React, { ChangeEventHandler, FC } from 'react';
interface InputPropsTypes {
    type?: string
    value?: string | number
    setValue?: ChangeEventHandler<HTMLInputElement>
    label?: string
    name?: string
    placeholder?: string
    inputStyles?: string
    inputType?: string
    error?: string
    disabled?: boolean
    checked?: boolean
    width?: string
}

interface Props {
    title: string
    formList: InputPropsTypes[]
}

// #327b91 checkbox color

const FormDetails: FC<Props> = ({ title, formList }) => {


    const renderFormFileds = (formItem: InputPropsTypes) => {
        switch (formItem.inputType) {
            case "input":
                return (
                    <>
                        <input
                            type={formItem.type || "text"}
                            onChange={formItem.setValue}
                            disabled={formItem.disabled}
                            value={formItem.value ? formItem.value : ''}
                            name={formItem.name}
                            placeholder={formItem.placeholder}
                            className={`${formItem.width} border border-gray-400 py-2 px-4 rounded-md focus:ring-1 focus:ring-indigo-600 focus:border-0 ${formItem.error ? "db__input-error" : ""}`}
                        />
                        {formItem.error && <h4>{formItem.error}</h4>}
                    </>
                );
            case "radio":
                return (
                    <label>
                        <input
                            type="radio"
                            name={formItem.name}
                            value={formItem.value}
                            onChange={formItem.setValue}
                            checked={formItem.checked}
                        />
                        {formItem.label}
                    </label>
                )
        }
    }

    return (
        <section>
            <article>
                <header>
                    <h1>{title}</h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {formList.map((formItem, index) => (
                        <div key={index} className={`${formItem.inputType === "radio" ? "sm:col-span-3" : ""}`}>
                            {renderFormFileds(formItem)}
                        </div>
                    ))}
                </div>
            </article>
        </section>
    )
}

export default FormDetails;