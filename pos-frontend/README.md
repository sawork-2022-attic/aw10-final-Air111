## 环境
1. node -16.14.0
2. react -18.1.0

## 安装依赖
```
npm install
```

## 运行
```
npm start
```

## 界面
可以切换图书类别，可以分页。  
点击charge会计算购物车内商品的总价格。

## 配置
### .env文件
在此处可以修改后端api地址

### requests/index.js文件
可以在[swaggerhub查看接口](https://app.swaggerhub.com/apis/nju6/bookstore/1.0.0#/cart/showCartTotal)，完整文档也可以查看根目录下的api.yaml文件。

* **[GET]** /products?category=all&page=1  
category为图书分类，page为当前页码。
response如下，totalpages为总页码，data就是当前category以及page下的所有图书。
```
{
  "totalpages": 20,
  "data": [
    {
      "id": "1",
      "name": "Java编程思想",
      "price": 20.1,
      "image": "https://www.linuxidc.com/upload/2014_08/140811101915661.jpg"
    }
  ]
}
```

* **[GET]** /carts/{cartId}
获取购物车为cartId的信息，其中cartId默认就是1，因为前端app没有切换购物车(用户)的功能。
response如下，其中amount为图书数量。
```
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "amount": 5,
      "product": {
        "id": "1",
        "name": "Java编程思想",
        "price": 20.1,
        "image": "https://www.linuxidc.com/upload/2014_08/140811101915661.jpg"
      }
    }
  ]
}
```

* **[POST]** /carts/{cartId}
给cartId的购物车添加商品。携带的数据为application/json格式，示例数据如下。
```
 {
    "id": "1",
    "name": "Java编程思想",
    "price": 20.1,
    "image": "https://www.linuxidc.com/upload/2014_08/140811101915661.jpg"
}
```