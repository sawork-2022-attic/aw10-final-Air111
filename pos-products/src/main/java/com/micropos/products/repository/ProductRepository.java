package com.micropos.products.repository;


import com.micropos.products.model.Product;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProductRepository {

    public List<Product> allProducts();

    public Flux<Product> getProducts(String category, Integer page);

    public Mono<Product> findProduct(String productId);

}