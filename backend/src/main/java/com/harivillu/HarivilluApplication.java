package com.harivillu;

import com.harivillu.model.Coupon;
import com.harivillu.model.CustomerReview;
import com.harivillu.model.Product;
import com.harivillu.repository.CouponRepository;
import com.harivillu.repository.CustomerReviewRepository;
import com.harivillu.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class HarivilluApplication {

    public static void main(String[] args) {
        SpringApplication.run(HarivilluApplication.class, args);
        System.out.println("==================================================================");
        System.out.println(" 🌈 Harivillu Collections Spring Boot Backend is running! ");
        System.out.println(" 🌐 API Base:       http://localhost:8080/api ");
        System.out.println(" 🛍️ Products API:   http://localhost:8080/api/products ");
        System.out.println(" 📦 Orders API:     http://localhost:8080/api/orders ");
        System.out.println(" 🎫 Coupons API:    http://localhost:8080/api/coupons/validate/HARIVILLU20 ");
        System.out.println(" 🗄️ H2 Console:     http://localhost:8080/api/h2-console ");
        System.out.println("==================================================================");
    }

    @Bean
    public CommandLineRunner seedData(ProductRepository productRepository,
                                     CouponRepository couponRepository,
                                     CustomerReviewRepository reviewRepository) {
        return args -> {
            // Seed Coupons
            if (couponRepository.count() == 0) {
                couponRepository.save(new Coupon("HARIVILLU20", 20, true, "Festive 20% discount on entire cart"));
                couponRepository.save(new Coupon("FIRST10", 10, true, "Welcome gift: 10% off first order"));
                couponRepository.save(new Coupon("DIWALI20", 20, true, "Diwali celebration 20% off"));
            }

            // Seed Verified Parent Reviews
            if (reviewRepository.count() == 0) {
                reviewRepository.save(new CustomerReview(
                    "Sravani Reddy", "Hyderabad", 5, true,
                    "My 6-year-old daughter wore the Mayura peacock saree for our family wedding. She wore it for 7 hours without complaining once! The 1-minute pre-stitched design saved us so much stress.",
                    "Daughter, Age 6", "Mayura Peacock Kanchipuram Saree"
                ));
                reviewRepository.save(new CustomerReview(
                    "Nandini Venkatesh", "San Jose, CA", 5, true,
                    "Ordering from USA was so smooth. Video calling with Harivillu stylists helped me pick the right length and size. Pure silk mark verified and arrived in 4 days.",
                    "Daughter, Age 10", "Harivillu Rainbow Navratna Pattu Pavada"
                ));
                reviewRepository.save(new CustomerReview(
                    "Anitha Suresh", "Bengaluru", 5, true,
                    "The Mother-Daughter matching duo stole the show at our housewarming! The pure zari gleam in person is even more stunning than the photos. Premium packaging too.",
                    "Mother & Daughter Set", "Matru-Bala Pure Silk Combo"
                ));
            }

            // Seed Handloom Saree Catalog
            if (productRepository.count() == 0) {
                productRepository.save(new Product(
                    "hvs-001",
                    "Mayura Peacock Kanchipuram Pure Silk Girl Saree",
                    "kanchi-silks",
                    4499.0,
                    6299.0,
                    "28% OFF",
                    4.9,
                    142,
                    Arrays.asList("4-6 Yrs", "7-9 Yrs", "10-12 Yrs", "13-16 Yrs"),
                    "Pure Mulberry Silk with Pure Gold Zari",
                    "Peacock Teal & Rani Pink",
                    "#0891b2",
                    "#db2777",
                    "Bestseller",
                    true,
                    16,
                    3,
                    Arrays.asList(
                        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
                        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                    ),
                    Arrays.asList(
                        "Silk Mark Certified 100% Pure Silk",
                        "Pre-pleated 1-Minute Drape with itch-free lining",
                        "Includes stitched unlined contrast brocade blouse",
                        "Handwoven peacock and temple border motifs"
                    ),
                    "A regal royal teal and magenta Kanchipuram silk saree woven specially for young girls. Made with ultra-soft pure mulberry silk and lightweight zari."
                ));

                productRepository.save(new Product(
                    "hvs-002",
                    "Karpaga Swarna Rani Pink Pre-Stitched Half-Saree Set",
                    "pattu-half-sarees",
                    3899.0,
                    5199.0,
                    "25% OFF",
                    4.8,
                    98,
                    Arrays.asList("2-4 Yrs", "5-7 Yrs", "8-10 Yrs", "11-14 Yrs"),
                    "Kanchi Tissue Pattu with Gilded Brocade",
                    "Rani Pink & Mango Gold",
                    "#db2777",
                    "#eab308",
                    "Festive Special",
                    true,
                    22,
                    5,
                    Arrays.asList(
                        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
                        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
                    ),
                    Arrays.asList(
                        "Pleated flared skirt with adjustable drawstring",
                        "Soft cotton voile lining prevents skin prickling",
                        "Handcrafted heavy golden zari borders",
                        "Free matching potli bag included"
                    ),
                    "Quintessential South Indian royal celebration attire. Designed with traditional temple zari border and lustrous rani pink silk base."
                ));

                productRepository.save(new Product(
                    "hvs-003",
                    "Kashvi Golden Temple Border Crimson Saree (1-Min Drape)",
                    "ready-to-wear",
                    2999.0,
                    4299.0,
                    "30% OFF",
                    5.0,
                    187,
                    Arrays.asList("3-5 Yrs", "6-8 Yrs", "9-11 Yrs", "12-15 Yrs"),
                    "Soft Chanderi Silk Cotton Blend",
                    "Crimson Temple Red",
                    "#991b1b",
                    "#d4af37",
                    "Kid-Friendly Hit",
                    true,
                    31,
                    2,
                    Arrays.asList(
                        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
                        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85"
                    ),
                    Arrays.asList(
                        "Patented 60-second slip-and-hook system",
                        "Featherweight 320g total weight",
                        "Breathable organic cotton weave",
                        "Zero safety pins needed"
                    ),
                    "Engineered for active little dancers! No fuss, no safety pin pricks. Just wrap, click the concealed velcro clasps, and she is ready to shine."
                ));

                productRepository.save(new Product(
                    "hvs-004",
                    "Anandi Pastel Lavender Bloom Organza Silk Saree",
                    "organza-party",
                    3499.0,
                    4699.0,
                    "25% OFF",
                    4.7,
                    64,
                    Arrays.asList("5-7 Yrs", "8-11 Yrs", "12-15 Yrs", "16-18 Yrs"),
                    "Fine Korean Organza with Scallop Zari Edge",
                    "Lilac Lavender & Rose Gold",
                    "#a855f7",
                    "#fb7185",
                    "Trending Now",
                    false,
                    11,
                    7,
                    Arrays.asList(
                        "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
                        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                    ),
                    Arrays.asList(
                        "Delicate hand-painted watercolor botanical prints",
                        "Scalloped cutwork border with metallic thread",
                        "Includes unstitched soft satin silk blouse",
                        "Ideal for birthdays, weddings, and farewells"
                    ),
                    "Dreamy modern pastel aesthetic. This airy organza drape floats effortlessly, lending an ethereal, modern princess vibe."
                ));

                productRepository.save(new Product(
                    "hvs-005",
                    "Harivillu Rainbow Navratna Pattu Pavada Langa Set",
                    "pattu-half-sarees",
                    4999.0,
                    6999.0,
                    "29% OFF",
                    5.0,
                    215,
                    Arrays.asList("1-3 Yrs", "4-6 Yrs", "7-10 Yrs", "11-14 Yrs"),
                    "Dharmavaram Pure Silk with Zari Checks",
                    "Vibrant Multi-Color Rainbow & Gold",
                    "#f59e0b",
                    "#ec4899",
                    "Signature Piece",
                    true,
                    38,
                    4,
                    Arrays.asList(
                        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85",
                        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                    ),
                    Arrays.asList(
                        "Harivillu Signature 7-color festive panel weaving",
                        "Pure zari checks with butti motifs",
                        "Double lining with pure cotton cambric",
                        "Handmade silk tassel latkans"
                    ),
                    "Named after Harivillu (The Rainbow), this joyful masterpiece brings seven auspicious shades in pure Dharmavaram silk."
                ));

                productRepository.save(new Product(
                    "hvs-008",
                    "Matru-Bala Pure Silk Mother & Daughter Saree Combo",
                    "twinning-combos",
                    9499.0,
                    12999.0,
                    "27% OFF",
                    5.0,
                    340,
                    Arrays.asList("Mom + Girl 3-6 Yrs", "Mom + Girl 7-11 Yrs", "Mom + Teen 12-16 Yrs"),
                    "Pure Kanchipuram Handloom Silk (Both)",
                    "Ruby Red & Temple Gold",
                    "#be123c",
                    "#d4af37",
                    "Celebrity Pick",
                    true,
                    45,
                    2,
                    Arrays.asList(
                        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85",
                        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
                    ),
                    Arrays.asList(
                        "Twin matched weave: Full 6-yard saree for Mom + Pre-stitched saree for Daughter",
                        "Two Silk Mark Authenticity Certificates included",
                        "Custom blouse stitching option with maggam work",
                        "Delivered in luxury velvet keepsake gift box"
                    ),
                    "Create unforgettable photo moments with our matching mother and daughter Kanchipuram silk set."
                ));
            }
        };
    }
}
