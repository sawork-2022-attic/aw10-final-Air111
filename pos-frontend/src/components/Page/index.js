import React from "react";
import './index.css'

const Page = ({ page,selected,handleClick }) => (
    <div
        className={`pagination-page ${selected?"pagination-page-selected":""}`}
        onClick={()=>{
            if(!selected){
                handleClick(page);
            }
        }}
    >
        {page}
    </div>
)

export default Page;