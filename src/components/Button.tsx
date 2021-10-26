import React, { FC } from 'react';
interface BtnProps {
    title: string
    type?: "button" | "submit" | "reset" | undefined
}

const Button: FC<BtnProps> = ({ title, type }) => {
    return (
        <button type={type ? type : "button"} style={{ background: "#f16d36" }}>{title}</button>
    )
}

export default Button;