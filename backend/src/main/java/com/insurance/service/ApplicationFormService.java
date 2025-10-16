package com.insurance.service;

import java.time.LocalDateTime;
import java.util.List;
 

import org.springframework.stereotype.Service;

import com.insurance.domain.ApplicationStatus;
import com.insurance.domain.PaymentStatus;
import com.insurance.model.ApplicationForm;
import com.insurance.model.Category;
import com.insurance.model.InsuranceOrder;
import com.insurance.model.Product;
import com.insurance.model.Seller;
import com.insurance.model.User;
import com.insurance.repository.ApplicationFormRepository;
import com.insurance.repository.CategoryRepository;
import com.insurance.repository.InsuranceOrderRepository;
import com.insurance.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationFormService {

    private final ApplicationFormRepository applicationFormRepository;
    private final InsuranceOrderRepository insuranceOrderRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ApplicationForm createApplicationForm(ApplicationForm form, Long policyId, Long categoryId, User user)
            throws Exception {

        // Fetch the product (policy)
        Product product = productRepository.findById(policyId)
                .orElseThrow(() -> new Exception("Policy not found"));

        // Fetch the category
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new Exception("Category not found"));

        // Set relationships
        form.setPolicy(product);
        form.setCategory(category);
        form.setSeller(product.getSeller());
        form.setUser(user);

        // Save and return
        return applicationFormRepository.save(form);
    }

    public ApplicationForm updateApplicationForm(ApplicationForm form, User user) throws Exception {
        if (!form.getUser().getId().equals(user.getId())) {
            throw new Exception("U Can't edit application form");
        }
        form.setUser(user);
        form.setSeller(form.getPolicy().getSeller());
        return applicationFormRepository.save(form);
    }

    public void deleteApplicationForm(ApplicationForm form, User user) throws Exception {
        if (!form.getUser().getId().equals(user.getId())) {
            throw new Exception("You can delete only your own application form");
        }

        applicationFormRepository.delete(form);
    }

    public ApplicationForm reviewForm(Long formId, Seller seller, boolean approve) throws Exception {
        ApplicationForm applicationForm = applicationFormRepository.findById(formId)
                .orElseThrow(() -> new Exception("Form not found with id"));

        if (!applicationForm.getSeller().getId().equals(seller.getId())) {
            throw new Exception("Access denied: This form does not belong to you");
        }

        if (approve) {
            applicationForm.setStatus(ApplicationStatus.ACCEPTED);

        } else {
            applicationForm.setStatus(ApplicationStatus.REJECTED);
        }
        return applicationFormRepository.save(applicationForm);
    }

    public List<ApplicationForm> getApplicationFormsByUserId(Long userId) {
        return applicationFormRepository.findByUserId(userId);
    }

    public List<ApplicationForm> getApplicationFormsBySellerId(Long sellerId) {
        return applicationFormRepository.findBySellerId(sellerId);
    }

    public ApplicationForm getApplicationFormByUser(Long formId, Long UserId) throws Exception {
        ApplicationForm form = applicationFormRepository.findById(formId)
                .orElseThrow(() -> new Exception("No application with this formid -> " + formId));
        if (!form.getUser().getId().equals(UserId)) {
            throw new Exception("Access Denied ");
        }
        return form;
    }

    public ApplicationForm getApplicationFormBySeller(Long formId, Long SellerId) throws Exception {
        ApplicationForm form = applicationFormRepository.findById(formId)
                .orElseThrow(() -> new Exception("No application with this formid -> " + formId));
        if (!form.getSeller().getId().equals(SellerId)) {
            throw new Exception("Access Denied ");
        }
        return form;
    }
}
