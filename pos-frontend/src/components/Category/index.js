import React from "react";
import './index.css'
import Label from "../Label"
import { useState } from 'react'

const Category = ({
    onSelect = function () { },
    defaultSelected,
    categories = []
}) => {
    const [selected, setSelected] = useState(defaultSelected)

    const handleClick=({label,value})=>{
        onSelect(value);
        setSelected(label)
    }
    return (
        <div
            className="category"
        >
            {categories.map(({ label, value }) => {
                return (
                    <div
                        key={label}
                    >
                        <Label
                            label={label}
                            value={value}
                            handleClick={handleClick}
                            selected={label===selected}
                        />
                    </div>
                )
            })}
        </div>
    )
}


export default Category