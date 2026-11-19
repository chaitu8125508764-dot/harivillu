package com.harivillu.service;

import com.harivillu.model.Product;
import com.harivillu.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return productRepository.findAll();
        }
        return productRepository.findByCategory(category);
    }

    public List<Product> getReadyToWearProducts() {
        return productRepository.findByReadyToWearTrue();
    }

    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return productRepository.findAll();
        }
        return productRepository.searchProducts(query.trim());
    }

    public List<Product> getProductsByAge(String age) {
        return productRepository.findByAgeGroup(age);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
