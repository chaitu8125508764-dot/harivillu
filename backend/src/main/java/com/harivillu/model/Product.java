package com.harivillu.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;
    private String discount;
    private Double rating;
    private Integer reviewsCount;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_age_groups", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "age_group")
    private List<String> ageGroups = new ArrayList<>();

    private String fabric;
    private String colorName;
    private String colorHex;
    private String contrastColorHex;
    private String tag;
    private Boolean readyToWear;
    private Integer viewsNow;
    private Integer stockLeft;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature", length = 500)
    private List<String> features = new ArrayList<>();

    @Column(length = 2500)
    private String description;

    public Product() {}

    public Product(String id, String name, String category, Double price, Double originalPrice, String discount,
                   Double rating, Integer reviewsCount, List<String> ageGroups, String fabric, String colorName,
                   String colorHex, String contrastColorHex, String tag, Boolean readyToWear, Integer viewsNow,
                   Integer stockLeft, List<String> images, List<String> features, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discount = discount;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.ageGroups = ageGroups != null ? ageGroups : new ArrayList<>();
        this.fabric = fabric;
        this.colorName = colorName;
        this.colorHex = colorHex;
        this.contrastColorHex = contrastColorHex;
        this.tag = tag;
        this.readyToWear = readyToWear;
        this.viewsNow = viewsNow;
        this.stockLeft = stockLeft;
        this.images = images != null ? images : new ArrayList<>();
        this.features = features != null ? features : new ArrayList<>();
        this.description = description;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }

    public String getDiscount() { return discount; }
    public void setDiscount(String discount) { this.discount = discount; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(Integer reviewsCount) { this.reviewsCount = reviewsCount; }

    public List<String> getAgeGroups() { return ageGroups; }
    public void setAgeGroups(List<String> ageGroups) { this.ageGroups = ageGroups; }

    public String getFabric() { return fabric; }
    public void setFabric(String fabric) { this.fabric = fabric; }

    public String getColorName() { return colorName; }
    public void setColorName(String colorName) { this.colorName = colorName; }

    public String getColorHex() { return colorHex; }
    public void setColorHex(String colorHex) { this.colorHex = colorHex; }

    public String getContrastColorHex() { return contrastColorHex; }
    public void setContrastColorHex(String contrastColorHex) { this.contrastColorHex = contrastColorHex; }

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public Boolean getReadyToWear() { return readyToWear; }
    public void setReadyToWear(Boolean readyToWear) { this.readyToWear = readyToWear; }

    public Integer getViewsNow() { return viewsNow; }
    public void setViewsNow(Integer viewsNow) { this.viewsNow = viewsNow; }

    public Integer getStockLeft() { return stockLeft; }
    public void setStockLeft(Integer stockLeft) { this.stockLeft = stockLeft; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
