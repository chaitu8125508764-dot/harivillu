package com.harivillu.controller;

import com.harivillu.dto.ApiResponse;
import com.harivillu.model.Coupon;
import com.harivillu.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/coupons")
public class CouponController {

    private final CouponService couponService;

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @GetMapping("/validate/{code}")
    public ResponseEntity<ApiResponse<Coupon>> validateCoupon(@PathVariable String code) {
        return couponService.validateCoupon(code)
                .map(c -> ResponseEntity.ok(ApiResponse.success("Coupon code '" + c.getCode() + "' applied! " + c.getDiscountPercent() + "% discount", c)))
                .orElse(ResponseEntity.badRequest().body(ApiResponse.error("Invalid or expired coupon code. Try 'HARIVILLU20' or 'FIRST10'")));
    }
}
