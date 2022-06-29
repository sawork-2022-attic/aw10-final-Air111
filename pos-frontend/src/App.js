import React from "react";
import { useState, useEffect } from "react";
import { WindowDisplay, Book, Cart, Item, Category, Card, Pagination } from "./components";
import './App.css'
import { getProducts, getCart, postCart, checkoutCart, checkOrder, resetCart } from "./requests";

function App() {

  // const [items, setItems] = useState([])
  const [products, setProducts] = useState([])
  const [productsToCart, setProductsToCart] = useState([])

  const [totalPages, setTotalPages] = useState(1);

  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const [inputOrderId, setinputOrderId] = useState("");

  useEffect(() => {
    // getProducts(category, page).then(({ data, totalpages }) => {
    //   setProducts(data)
    //   setTotalPages(totalpages);
    // })
    getProducts(category, page).then(data => {
      setProducts(data)
      setTotalPages(20);
    })
  }, [category, page])

  useEffect(() => {
    getCart().then(({items}) => {
      setProductsToCart(items)
    })
  }, [])

  function handleAddBtn(product){
    return ()=>{
      postCart(product).then(res=>{
        getCart().then(({items}) => {
          setProductsToCart(items)
        })
      })
    }
  }

  function handleCancelBtn() {
    return ()=>{
      resetCart().then(res=>{
        getCart().then(({items}) => {
          setProductsToCart(items)
        })
      })
      alert("cancel")
      console.log("cancel")
    }
  }

  // function handleChargeBtn(charge) {
  //   alert(charge)
  //   console.log("charge")
  // }

  function handleChargeBtn() {
    return ()=>{
      getCart().then(cart=>{
        checkoutCart(cart).then(order=>{
          alert("total: " + order.total)
          alert("your order id: " + order.id)
          console.log("info")
        })
      })
    }
  }

  function handleCheckBtn() {
    checkOrder(inputOrderId).then(res=>{
      alert(res)
      console.log("check")
    })
  }

  // function handleAddBtn(product) {
  //   return () => {
  //     setProductsToCart(prev => {
  //       const findIndex = prev.findIndex(e => e.product.id === product.id);
  //       const newData = [...prev];
  //       if (findIndex > -1) {
  //         newData.splice(findIndex, 1, {
  //           amount: prev[findIndex].amount + 1,
  //           product
  //         })
  //       } else {
  //         newData.push({
  //           amount: 1,
  //           product
  //         })
  //       }
  //       return newData
  //     })
  //   }
  // }

  // function handleCancelBtn() {
  //   setProductsToCart([])
  // }

  // function handleChargeBtn(charge) {
  //   alert(charge)
  //   setProductsToCart([])
  // }
  console.log(products);
  return (
    <div className="App">
      <div className="top">
        <input type="text" width="80%" placeholder="your order id" value={inputOrderId} onChange={(e) => setinputOrderId(e.target.value)} />
        <button
          className="check-btn"
          onClick={(event) => {
            handleCheckBtn()
          }}
        >
          <span>check</span>
        </button>
      </div>
      <div
        className="left"
      >
        <Card
          width="100%"
          height="100%"
        >
          <div
            style={{
              position: "sticky",
              top: "0"
            }}
          >
            <Category
              onSelect={(value) => {
                setCategory(value);
              }}
              defaultSelected="all"
              categories={[
                { label: "all", value: "all" },
                { label: "category1", value: "category1" },
                { label: "category2", value: "category2" },
                { label: "category3", value: "category3" },
                { label: "category4", value: "category4" },
                { label: "category5", value: "category5" },
              ]}
            />
          </div>
          <WindowDisplay>
            {products.map(product => {
              return (
                <Book
                  key={product.name}
                  image={product.image}
                  name={product.name}
                  price={product.price.toFixed(3)}
                  handleAddBtn={handleAddBtn(product)}
                />
              )
            })}
          </WindowDisplay>
          <Pagination
            defaulPage={1}
            totalPage={totalPages}
            onSelect={(page) => {
              setPage(page)
            }}
          />
        </Card>
      </div>
      <div
        className="right"
      >
        <Cart
          handleCancelBtn={handleCancelBtn()}
          handleChargeBtn={handleChargeBtn()}
          products={productsToCart}
        >
          {productsToCart.map(item => {
            const { product, amount } = item;
            return (
              <Item
                key={product.name}
                image={product.image}
                name={product.name}
                amount={amount}
              ></Item>
            )
          })}
        </Cart>
      </div>
    </div>
  );
}

export default App;
