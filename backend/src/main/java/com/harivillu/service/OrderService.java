package com.harivillu.service;

import com.harivillu.dto.OrderRequest;
import com.harivillu.model.Coupon;
import com.harivillu.model.Order;
import com.harivillu.model.OrderItem;
import com.harivillu.model.Product;
import com.harivillu.repository.OrderRepository;
import com.harivillu.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CouponService couponService;

    private static final double FREE_SHIPPING_THRESHOLD = 2500.0;
    private static final double STANDARD_SHIPPING_FEE = 199.0;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, CouponService couponService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.couponService = couponService;
    }

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setShippingAddress(request.getShippingAddress());
        order.setCity(request.getCity());
        order.setPostalCode(request.getPostalCode());
        order.setCountry(request.getCountry() != null ? request.getCountry() : "India");

        List<OrderItem> orderItems = new ArrayList<>();
        double subtotal = 0.0;

        for (OrderRequest.OrderItemDto itemDto : request.getItems()) {
            Optional<Product> prodOpt = productRepository.findById(itemDto.getProductId());
            double price = 0.0;
            String name = "Handcrafted Saree";
            String image = "";

            if (prodOpt.isPresent()) {
                Product p = prodOpt.get();
                price = p.getPrice();
                name = p.getName();
                if (p.getImages() != null && !p.getImages().isEmpty()) {
                    image = p.getImages().get(0);
                }
            } else if (itemDto.getProductId().startsWith("custom-")) {
                price = 4999.0; // Custom Virtual Drape Studio pricing
                name = "Custom Handloom Drape";
                image = "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85";
            }

            int qty = itemDto.getQuantity() != null && itemDto.getQuantity() > 0 ? itemDto.getQuantity() : 1;
            double itemTotal = price * qty;
            subtotal += itemTotal;

            OrderItem orderItem = new OrderItem(
                itemDto.getProductId(),
                name,
                itemDto.getAgeGroup(),
                itemDto.getColor(),
                qty,
                price,
                itemTotal,
                image
            );
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setSubtotal(subtotal);

        // Apply Coupon Discount
        double discount = 0.0;
        if (request.getCouponCode() != null && !request.getCouponCode().trim().isEmpty()) {
            Optional<Coupon> couponOpt = couponService.validateCoupon(request.getCouponCode());
            if (couponOpt.isPresent()) {
                Coupon c = couponOpt.get();
                discount = (subtotal * c.getDiscountPercent()) / 100.0;
                order.setCouponCode(c.getCode());
            }
        }
        order.setDiscount(discount);

        // Calculate Shipping
        double shipping = (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal == 0) ? 0.0 : STANDARD_SHIPPING_FEE;
        order.setShippingFee(shipping);

        // Calculate Final Total
        double total = Math.max(0.0, subtotal - discount + shipping);
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    public Optional<Order> getOrderByOrderNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    private String generateOrderNumber() {
        Random random = new Random();
        int digits = 10000 + random.nextInt(90000);
        return "HVS-" + digits;
    }
}
