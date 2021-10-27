import { FormikHelpers, useFormik } from 'formik';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import useGroupBy from '../../hooks/useGroupBy';
import { dataToSendToserverTypes } from '../AddTax';
import SearchBar from './SearchBar';
import SearchItems from './SearchItems';

interface Values {
    searchText: string
}

interface SearchProps {
    applicableItem: number[]
    searchResult: any[]
    dataToSendToserver: dataToSendToserverTypes
    setDataToSendToServer: Dispatch<SetStateAction<dataToSendToserverTypes>>
}

const Search: FC<SearchProps> = ({
    applicableItem,
    searchResult,
    setDataToSendToServer,
    dataToSendToserver
}) => {
    const initialValues: Values = {
        searchText: ""
    }

    const [grouped] = useGroupBy(searchResult)

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            // 
        }
    })
    const {
        handleSubmit,
        values,
        handleChange,
    } = formik;



    const handleOnCheckChange = (e: ChangeEvent) => {
        const value = Number(e.target.id)
        let items = dataToSendToserver.applicable_items
        if (items.includes(value)) {
            items.splice(items.indexOf(value), 1)
        } else {
            items.push(value)
        }
        setDataToSendToServer({
            ...dataToSendToserver,
            applicable_items: items
        })
    }

    const handleOnCategoryCheckChange = (e: ChangeEvent) => {
        const value = e.target.id
        const ids = value.split(',');
        let items = dataToSendToserver.applicable_items
        const alreadyChecked = ids.every(elm => items.includes(Number(elm)))
        if (alreadyChecked) {
            items = items.filter(item => !ids.includes(item.toString()))
        } else {
            ids.forEach(i => items.push(Number(i)));
        }
        setDataToSendToServer({
            ...dataToSendToserver,
            applicable_items: items

        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SearchBar
                    name="searchText"
                    value={values.searchText}
                    handleChange={handleChange}
                />
            </form>
            <div className="my-5">
                {Object.keys(grouped).reverse().map((item: any) => {
                    let ids: number[] = [];
                    grouped[item].forEach((i: any) => ids.push(i.id));
                    const isCategoryChecked = ids.every(elem => applicableItem.includes(elem))

                    return (
                        <>
                            <SearchItems
                                handleChange={handleOnCategoryCheckChange}
                                label={item === "undefined" ? "" : item}
                                category={true}
                                isChecked={isCategoryChecked}
                                id={ids.join()}
                            />
                            {grouped[item] && grouped[item].map((a: any) => (
                                <SearchItems
                                    handleChange={handleOnCheckChange}
                                    label={a.name}
                                    category={false}
                                    id={a.id}
                                    isChecked={applicableItem.includes(a.id)}
                                />
                            ))}
                        </>

                    )
                })}

            </div>
        </div>
    )
}

export default Search
