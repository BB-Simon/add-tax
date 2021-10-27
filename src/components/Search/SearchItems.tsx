import { ChangeEventHandler, FC } from 'react';

interface SearchItemsProps {
    label: string
    category?: boolean
    id?: string
    handleChange: ChangeEventHandler<HTMLInputElement>
    isChecked: boolean
}

const SearchItems: FC<SearchItemsProps> = ({ label, category, id, handleChange, isChecked }) => {
    return (
        <div className={`flex items-center my-2 ${category ? "bg-gray-400  p-2 rounded-md" : "ml-5"}`}>
            <input
                id={id}
                name={id}
                onChange={handleChange}
                type="checkbox"
                checked={isChecked}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor={id} className={`ml-2 block text-sm ${category ? "text-white" : "text-gray-900"}`}>
                {label}
            </label>
        </div>

    )
}

export default SearchItems;
