import React from "react";
import './index.css'

const Item = ({ image, name, amount }) => (
  <div
    className='item'
  >
    <div
      className='item-image'
    >
      <img
        src={image}
        alt="this is a book"
      />
    </div>

    <div
      className='item-title-wrap'
    >
      <span
        className='item-title'
      >
        {name}
      </span>
    </div>
    <div
      className='amount'
    >
      <span
      >
        {amount}
      </span>
    </div>

  </div>
)

export default Item;