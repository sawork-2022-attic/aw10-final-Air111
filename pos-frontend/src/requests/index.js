import { API } from "../config";

const url = API.STORE;

// async function getCarts() {
//     const res = await fetch(`${url}/carts`, {
//         method: 'get',
//         mode: 'cors',
//     });
//     return res.json();
// }

async function postCart(product,cartId=1) {
    const res = await fetch(`${url}/carts/${cartId}`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
    })
    return res.json();
}

async function getCart(id=1) {
    const res = await fetch(`${url}/carts/${id}`, {
        method: 'get',
        mode: 'cors',
    });
    return res.json();
}

async function checkoutCart(cart) {
    const res = await fetch(`${url}/order/checkout`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart),
    });
    return res.json()
}

async function checkOrder(id) {
    const res = await fetch(`${url}/check/${id}`, {
        method: 'get',
        mode: 'cors',
    })
    return res.text()
}

async function resetCart(id=1) {
    const res = await fetch(`${url}/carts/${id}`, {
        method: 'delete',
        mode: 'cors',
    });
    return res.json();
}

async function getProducts(category = "all", page = 1) {
    const completeUrl=new URL(`${url}/products`);
    completeUrl.searchParams.append("category",category);
    completeUrl.searchParams.append("page",page);
    const res = await fetch(completeUrl, {
        method: 'get',
        mode: 'cors',
    });
    return res.json()
}

export {
    // getCarts,
    postCart,
    getCart,
    getProducts,
    checkOrder,
    checkoutCart,
    resetCart
}