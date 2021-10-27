import React, { FC, MouseEventHandler } from 'react';
interface BtnProps {
    title: string
    type?: "button" | "submit" | "reset" | undefined
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<BtnProps> = ({ title, type, handleClick = f => f }) => {
    return (
        <button
            onClick={handleClick}
            type={type ? type : "button"}
            style={{ background: "#f16d36" }}
            className="px-6 py-3 text-white rounded-md my-5"
        >
            {title}
        </button>
    )
}

export default Button;