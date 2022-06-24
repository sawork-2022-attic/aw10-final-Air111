import React from "react";
import './index.css'

const WindowDisplay = ({
    children,
}) => {
    return (
        <div
            className="paper"
        >
            {children.map(child => {
                return (
                    <div
                        className='paper-child'
                        key={child.key || Math.random()}
                    >
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default WindowDisplay;