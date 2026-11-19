package com.harivillu.controller;

import com.harivillu.dto.ApiResponse;
import com.harivillu.model.Product;
import com.harivillu.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String age) {
        
        List<Product> products;
        if (search != null && !search.trim().isEmpty()) {
            products = productService.searchProducts(search);
        } else if (category != null && !category.trim().isEmpty()) {
            products = productService.getProductsByCategory(category);
        } else if (age != null && !age.trim().isEmpty()) {
            products = productService.getProductsByAge(age);
        } else {
            products = productService.getAllProducts();
        }

        return ResponseEntity.ok(ApiResponse.success("Products retrieved successfully", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        return productService.getProductById(id)
                .map(p -> ResponseEntity.ok(ApiResponse.success("Product found", p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ready-to-wear")
    public ResponseEntity<ApiResponse<List<Product>>> getReadyToWearProducts() {
        List<Product> products = productService.getReadyToWearProducts();
        return ResponseEntity.ok(ApiResponse.success("1-Minute Ready to Wear sarees retrieved", products));
    }
}
