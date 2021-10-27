import { FormikHelpers, useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import Button from '../Button'
import Divider from '../Divider'
import FormDetails from '../FormDetails'
import Search from '../Search'

interface Values {
    applied_to: string
    name: string
    rate: number
}

export interface dataToSendToserverTypes extends Values {
    applicable_items: number[]
}
const initialValues: Values = {
    applied_to: '',
    name: '',
    rate: 0
}

const AddTax: FC = () => {
    const [dataToSendToserver, setDataToSendToServer] = useState<dataToSendToserverTypes>({
        applicable_items: [],
        applied_to: "",
        name: "",
        rate: 0
    })

    const [searchResult, setSearchResult] = useState<any>([])

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            //    
        }
    })
    const {
        values,
        handleChange,
    } = formik;

    useEffect(() => {
        let items: number[] = [];
        if (values.applied_to === "all") {
            searchResult.map((item: any) => items.push(item.id))
        } else {
            items = []
        }
        setDataToSendToServer({
            ...dataToSendToserver,
            name: values.name,
            rate: values.rate,
            applied_to: values.applied_to,
            applicable_items: items
        })
    }, [values])

    const allChecked = searchResult.every((item: any) => dataToSendToserver.applicable_items.includes(item.id))

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setSearchResult(data))
    }, [])

    const handleOnClick = () => {
        console.log('dataToSendToserver', dataToSendToserver);

    }

    return (
        <div className="my-20 px-5 sm:px10">
            <form >
                <FormDetails
                    title="Add Tax"
                    formList={[
                        {
                            value: values.name,
                            setValue: (value) => {
                                handleChange(value);
                            },
                            label: "",
                            name: "name",
                            placeholder: "Tax",
                            inputStyles: "sd__md-input-box",
                            inputType: "input",
                            width: "w-full",
                            error: "",
                        },
                        {
                            value: values.rate,
                            setValue: (value) => {
                                handleChange(value)
                            },
                            label: "",
                            name: "rate",
                            placeholder: "Tax",
                            inputStyles: "sd__md-input-box",
                            inputType: "input",
                            width: "w-4/12",
                            error: "",
                        },
                        {
                            value: "all",
                            setValue: (value) => {
                                handleChange(value)
                            },
                            checked: allChecked,
                            label: "Apply to all items in collection",
                            name: "applied_to",
                            inputType: "radio",
                            error: "",
                        },
                        {
                            value: "some",
                            setValue: (value) => {
                                handleChange(value)
                            },
                            checked: !allChecked,
                            label: "Apply to specific items",
                            name: "applied_to",
                            inputType: "radio",
                            error: "",
                        },
                    ]}
                />
            </form>
            <Divider />
            <Search
                applicableItem={dataToSendToserver.applicable_items}
                searchResult={searchResult}
                setDataToSendToServer={setDataToSendToServer}
                dataToSendToserver={dataToSendToserver}
            />
            <footer>
                <Button handleClick={handleOnClick} type="submit" title={`Apply tax to ${6} item(s)`} />
            </footer>
        </div>
    )
}

export default AddTax;
