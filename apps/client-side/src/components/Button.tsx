import React, { ReactElement } from 'react'

interface buttonProps {
    varient: "primary" | "secondary";
    text: string,
    startIcon: ReactElement
}

const varientColor = {
    "primary": "bg-white/10 text-white",
    "secondary": "bg-green-500 text"
}

const defaultStyle = "px-3 py-1 rounded-sm flex items-center gap-2"

function Button({ varient, text, startIcon }: buttonProps) {
    return (
        <button className={varientColor[varient] + " " + defaultStyle}>
            {startIcon}
            {text}
        </button>

    )
}

export default Button