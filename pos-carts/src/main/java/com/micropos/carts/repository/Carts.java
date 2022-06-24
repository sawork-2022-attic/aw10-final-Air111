package com.micropos.carts.repository;

import com.micropos.carts.model.Cart;
import com.micropos.carts.model.Item;
import com.micropos.carts.model.Product;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Carts{

    private final List<Cart> carts = new ArrayList<>();

    public Carts() {
        Product sampleProduct = new Product("1", "Java编程思想", 20.1, "https://www.linuxidc.com/upload/2014_08/140811101915661.jpg");
        Item sampleItem = new Item(1, 5, sampleProduct);
        List<Item> items = new ArrayList<>();
        items.add(sampleItem);
        Cart sampleCart = new Cart(1, items);
        carts.add(sampleCart);
    }

    public boolean addCart(Cart cart) {
        try {
            carts.add(cart);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public List<Cart> getCarts() {
        return carts;
    }

    @Nullable
    @Cacheable(value = "carts", key = "#userId")
    public Cart getCart(int userId) {
        for (Cart cart: carts) {
            if (cart.getId() == userId)
                return cart;
        }
        return null;
    }

    @Nullable
    public Item getItem(int userId, String productId) {
        for (Item item: getCart(userId).getItems()) {
            if (item.getProduct().getId().equals(productId))
                return item;
        }
        return null;
    }

    @CacheEvict(value = "carts", key = "#userId")
    public boolean addItem(int userId, Item item) {
        List<Item> itemList = getCart(userId).getItems();
        String productId = item.getProduct().getId();
        for (int i = 0; i < itemList.size(); i++) {
            if (itemList.get(i).getProduct().getId().equals(productId)) {
                int quantity = itemList.get(i).getAmount();
                quantity += item.getAmount();
                if (quantity < 0)
                    return false;
                if (quantity == 0)
                    itemList.remove(i);
                else
                    itemList.get(i).setAmount(quantity);
                return true;
            }
        }
        return itemList.add(item);
    }

    @CacheEvict(value = "carts", key = "#userId")
    public boolean addProduct(int userId, Product product) {
        Item item = new Item(0, 1, product);
        return addItem(userId, item);
    }

    @CacheEvict(value = "carts", key = "#userId")
    public boolean removeProduct(int userId, String productId) {
        List<Item> itemList = getCart(userId).getItems();
        for (int i = 0; i < itemList.size(); i++) {
            if (itemList.get(i).getProduct().getId().equals(productId)) {
                itemList.remove(i);
                return true;
            }
        }
        return false;
    }

    @CacheEvict(value = "carts", key = "#userId")
    public Cart remove(int userId) {
        for (int i = 0; i < carts.size(); i++) {
            if (carts.get(i).getId() == userId) {
                Cart res = carts.get(i);
                carts.remove(i);
                return res;
            }
        }
        return null;
    }

    public double getTotal(int userId) {
        for (Cart cart: carts) {
            if (cart.getId() == userId) {
                double res = 0;
                for (Item item: cart.getItems()) {
                    res += item.getProduct().getPrice();
                }
                return res;
            }
        }
        return 0;
    }

}
