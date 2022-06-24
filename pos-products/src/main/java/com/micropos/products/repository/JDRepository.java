package com.micropos.products.repository;

import com.micropos.products.model.Product;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JDRepository implements ProductRepository {
    private List<Product> products = null;

    public JDRepository() {
//        try {
//            if (products == null)
//                products = parseJD("Java");
//        } catch (IOException e) {
//            products = new ArrayList<>();
//        }
        Product sampleProduct = new Product(
                "1", "Java编程思想", 20.1,
                "https://www.linuxidc.com/upload/2014_08/140811101915661.jpg");
        products = new ArrayList<>();
        products.add(sampleProduct);
    }

    @Override
    @Cacheable(value = "products")
    public List<Product> allProducts() {
        return products;
    }

    @Override
    public List<Product> getProducts(String category, Integer page) {
        if (page > 5)
            page = page % 6;
        int step = products.size() / 6;
        return products.subList(page * step, Math.min(products.size(), page * step + Math.max(1, step)));
    }

    @Override
    public Product findProduct(String productId) {
        for (Product p : allProducts()) {
            if (p.getId().equals(productId)) {
                return p;
            }
        }
        return null;
    }

    public static List<Product> parseJD(String keyword) throws IOException {
        String url = "https://search.jd.com/Search?keyword=" + keyword;
        Document document = Jsoup.parse(new URL(url), 10000);
        Element element = document.getElementById("J_goodsList");
        Elements elements = element.getElementsByTag("li");
        List<Product> list = new ArrayList<>();

        for (Element el : elements) {
            String id = el.attr("data-spu");
            String img = "https:".concat(el.getElementsByTag("img").eq(0).attr("data-lazy-img"));
            String price = el.getElementsByAttribute("data-price").text();
            String title = el.getElementsByClass("p-name").eq(0).text();
            if (title.indexOf("，") >= 0)
                title = title.substring(0, title.indexOf("，"));

            Product product = new Product(id, title, Double.parseDouble(price), img);
            list.add(product);
        }
        return list;
    }
}
