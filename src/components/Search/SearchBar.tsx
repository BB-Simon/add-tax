import React, { ChangeEventHandler, FC } from 'react'

interface SearchBarProps {
    handleChange: ChangeEventHandler<HTMLInputElement>
    value: string
    name: string
}

const SearchBar: FC<SearchBarProps> = ({ handleChange, value, name }) => {
    return (
        <input
            type="search"
            onChange={handleChange}
            value={value}
            name={name}
            placeholder="Search items"
            className={`border border-gray-400 py-2 px-4 rounded-md focus:ring-1 focus:ring-indigo-600 focus:border-0`}
        />
    )
}

export default SearchBar;