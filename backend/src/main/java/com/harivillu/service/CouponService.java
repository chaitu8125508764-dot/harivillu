package com.harivillu.service;

import com.harivillu.model.Coupon;
import com.harivillu.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CouponService {

    private final CouponRepository couponRepository;

    @Autowired
    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public Optional<Coupon> validateCoupon(String code) {
        if (code == null) return Optional.empty();
        return couponRepository.findByCodeIgnoreCaseAndActiveTrue(code.trim());
    }

    public Coupon saveCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }
}
