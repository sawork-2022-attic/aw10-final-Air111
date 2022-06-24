import React from "react";
import Card from "../Card";
import './index.css'

const Cart = ({
  children,
  handleCancelBtn,
  handleChargeBtn,
  products,
}) => (
  <Card
    height="100%"
    width="100%"
  >
    <p
      style={{
        fontWeight: 'bold',
        padding: "10px 10px",
        margin: "0"
      }}
    >item</p>
    <hr
      className="hr-line"
    />
    <div
      className="items"
    >
      {children.map(child => {
        return (
          <div
            key={child.key || Math.random()}
          >
            {child}
            <hr
              className="hr-line"
            />
          </div>
        )
      })}
    </div>
    <hr
      className="hr-line"
    />
    <div
      style={{
        padding: "20px",
        height: '250px'
      }}
    >
      <p
        className="p"
      >
        <span className="left-span span bold-span">Tax</span>
        <span className="right-span span">0%</span>
      </p>
      <p
        className="p"
      >
        <span className="left-span span bold-span">Discount</span>
        <span className="right-span span">0%</span>
      </p>
      <p
        className="p"
      >
        <span className="left-span span bold-span">Sub Total</span>
        <span className="right-span span">
          ${products.reduce((prev, current) => {
            return prev + current.amount * current.product.price;
          }, 0).toFixed(3)}
        </span>
      </p>
      <p
        className="p"
      >
        <span className="left-span span bold-span">Total</span>
        <span className="right-span span">
          ${products.reduce((prev, current) => {
            return prev + current.amount * current.product.price;
          }, 0).toFixed(3)}
        </span>
      </p>
      <div
        className="cancel-charge-btns"
      >
        <button
          className="cancel-btn"
          onClick={() => {
            handleCancelBtn()
          }}
        >
          <svg t="1651651991001" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2479" width="32" height="32"><path d="M509.92 843.84C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m5.552-367.872l-74.032-74.032a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.64l74.032 74.032-74.032 74.032a16 16 0 0 0 0 22.624l11.312 11.312a16 16 0 0 0 22.624 0l74.032-74.032 74.032 74.032a16 16 0 0 0 22.64 0l11.312-11.312a16 16 0 0 0 0-22.624l-74.032-74.032 74.032-74.032a16 16 0 0 0 0-22.64l-11.312-11.312a16 16 0 0 0-22.64 0l-74.032 74.032z" p-id="2480" fill="#d81e06"></path></svg>
          <span>cancel</span>
        </button>
        <button
          className="charge-btn"
          onClick={() => {
            handleChargeBtn(
              products.reduce((prev, current) => {
                return prev + current.amount * current.product.price;
              }, 0).toFixed(3)
            )
          }}
        >
          <svg t="1651652313277" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3567" width="32" height="32"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32z m-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16z m392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z" p-id="3568" fill="#ffffff"></path></svg>
          <span>charge</span>
        </button>
      </div>
    </div>
  </Card>
)

export default Cart;