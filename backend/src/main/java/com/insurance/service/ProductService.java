package com.insurance.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.insurance.Request.CreateProductRequest;
import com.insurance.model.Category;
import com.insurance.model.Product;
import com.insurance.model.Seller;
import com.insurance.repository.CategoryRepository;
import com.insurance.repository.ProductRepository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public Product createProduct(CreateProductRequest req, Seller seller) {
        // Normalize category name to avoid case-sensitive duplicates
        String categoryName = req.getCategoryName().trim();

        // Find category by name, create if not exists
        Category category = categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    return categoryRepository.save(newCategory);
                });

        // Create new product
        Product product = new Product();
        product.setCategory(category);
        product.setSeller(seller);
        product.setImage(req.getImage());
        product.setName(req.getName());
        product.setHead(req.getHead());
        product.setSubName(req.getSubName());
        product.setType(req.getType());
        product.setPremium(req.getPremium());
        product.setCoverage(req.getCoverage());
        product.setDesc1(req.getDesc1());
        product.setDesc2(req.getDesc2());
        product.setDesc3(req.getDesc3());

        return productRepository.save(product);
    }

    public Product findByProductId(Long ProductId) throws Exception {
        return productRepository.findById(ProductId)
                .orElseThrow(() -> new Exception("Product not found with " + ProductId));
    }

    public void deleteProduct(Long ProductId) throws Exception {
        Product product = findByProductId(ProductId);
        productRepository.delete(product);
    }

    public Product updateProduct(Long ProductId, Product product) {
        product.setId(ProductId);
        return productRepository.save(product);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.searchProduct(query);
    }

    public List<Product> getProductsBySellerId(Long SellerId) {
        return productRepository.findBySellerId(SellerId);
    }

    public Page<Product> searchAllProducts(String category, String type, Double minPremium, Double maxPremium,
            String sort, Integer pageNumber) {
        Specification<Product> spec = (root, query, createBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null && !category.isEmpty()) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(createBuilder.equal(categoryJoin.get("name"), category));
            }

            if (type != null && !type.isEmpty()) {
                predicates.add(createBuilder.equal(root.get("type"), type));
            }

            if (minPremium != null) {
                predicates.add(createBuilder.greaterThanOrEqualTo(root.get("premium"), minPremium));
            }
            if (maxPremium != null) {
                predicates.add(createBuilder.lessThanOrEqualTo(root.get("premium"), maxPremium));
            }
            return createBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            switch (sort) {
                case "premium_low":
                    pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("premium").ascending());
                    break;
                case "premium_high":
                    pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("premium").descending());
                    break;
                default:
                    pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
                    break;
            }
        } else {
            pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
        }
        return productRepository.findAll(spec, pageable);

    }
}
