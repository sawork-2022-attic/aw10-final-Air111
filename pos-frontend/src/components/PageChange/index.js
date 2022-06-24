import React from "react";
import './index.css'

const PageChange = ({ deriction, handleClick, disabled, step = 1 }) => (
    <div
        className={disabled
            ? "pagination-pagechange-disabled"
            : "pagination-pagechange"}
        style={{
        }}
        onClick={() => {
            if (!disabled) {
                handleClick(deriction === 'left' ? -1 : 1);
            }
        }}
    >
        {deriction === 'left' ? '<' : '>'}
    </div>
)

export default PageChange;