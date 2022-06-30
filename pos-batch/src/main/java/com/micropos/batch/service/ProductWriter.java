package com.micropos.batch.service;

import com.micropos.batch.model.Product;
import com.micropos.batch.model.ProductEntity;
import com.micropos.batch.repository.ProductRepository;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class ProductWriter implements ItemWriter<Product>, StepExecutionListener {

    private ProductRepository productRepository;

    private final Set<String> keys = new HashSet<>();

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void beforeStep(StepExecution stepExecution) {

    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        return null;
    }

    @Override
    public void write(List<? extends Product> list) throws Exception {
//        list.forEach(System.out::println);
//        System.out.println("chunk written");
        for (Product product: list) {
            //Optional<ProductEntity> optionalProductEntity = productRepository.findById(product.getAsin());
            //List<?> entities = productRepository.getProductEntitiesByAsin(product.getAsin());
            //if (optionalProductEntity.isPresent())
            //if (!entities.isEmpty())
//            if (productRepository.existsById(product.getAsin()))
//                continue;
//            else {
//                if (product.getAsin().equals("B00005N7NQ"))
//                    System.out.println("wtf");
//            }

            String title = product.getTitle();
            String asin = product.getAsin();
            String price = product.getPrice();
            List<String> imageURLHighRes = product.getImageURLHighRes();
            if (title == null || asin == null || price == null || imageURLHighRes == null)
                continue;
            if (keys.contains(asin))
                continue;

            ProductEntity entity = new ProductEntity();
            entity.setId(asin);
            if (title.length() > 255)
                title = title.substring(0, 255);
            entity.setName(title);
//            List<String> category = product.getCategory();
//            if (category != null && category.size() > 0)
//                entity.setCategory(category.get(category.size() - 1));
//            else
//                entity.setCategory("");

            if (imageURLHighRes.size() > 0)
                entity.setImage(imageURLHighRes.get(0));
            else
                entity.setImage("");

            if (!price.equals("")) {
                try {
                    if (price.contains("$"))
                        price = price.substring(price.indexOf("$") + 1);
                    entity.setPrice(Double.parseDouble(price));
                }
                catch (NumberFormatException e) {
                    entity.setPrice(0.0);
                }
            }
            else
                entity.setPrice(0.0);
            keys.add(asin);
            productRepository.save(entity);
            //productRepository.flush();
        }
    }
}
