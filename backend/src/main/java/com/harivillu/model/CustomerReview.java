package com.harivillu.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_reviews")
public class CustomerReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String city;
    private Integer rating;
    private Boolean verified;

    @Column(length = 2000)
    private String comment;

    private String daughterAge;
    private String sareeName;

    public CustomerReview() {}

    public CustomerReview(String customerName, String city, Integer rating, Boolean verified,
                          String comment, String daughterAge, String sareeName) {
        this.customerName = customerName;
        this.city = city;
        this.rating = rating;
        this.verified = verified;
        this.comment = comment;
        this.daughterAge = daughterAge;
        this.sareeName = sareeName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getDaughterAge() { return daughterAge; }
    public void setDaughterAge(String daughterAge) { this.daughterAge = daughterAge; }

    public String getSareeName() { return sareeName; }
    public void setSareeName(String sareeName) { this.sareeName = sareeName; }
}
