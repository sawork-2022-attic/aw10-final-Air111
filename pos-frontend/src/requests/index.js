import { API } from "../config";

const url = "http://localhost:8080/api";

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

async function getProducts(category = "all", page = 1) {
    const completeUrl=new URL(`${url}/products`);
    completeUrl.searchParams.append("category",category);
    completeUrl.searchParams.append("page",page);
    const res = await fetch(completeUrl, {
        method: 'get',
        mode: 'cors',
    });
    return res.json();
}

export {
    // getCarts,
    postCart,
    getCart,
    getProducts,
}