package com.insurance.controller;

import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.insurance.Request.ApplicationFormRequest;
import com.insurance.Response.ApiResponse;
import com.insurance.model.ApplicationForm;
import com.insurance.model.Seller;
import com.insurance.model.User;
import com.insurance.service.ApplicationFormService;
import com.insurance.service.SellerService;
import com.insurance.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/applicationform")
public class ApplicationFormController {

    private final UserService userService;
    private final SellerService sellerService;
    private final ApplicationFormService applicationFormService;

    // @PostMapping("/create")
    // public ResponseEntity<ApplicationForm>
    // createApplicationForm(@RequestHeader("Authorization") String jwt,
    // @RequestBody ApplicationForm applicationForm) throws Exception {
    // User user = userService.findUserbyJwt(jwt);
    // ApplicationForm savedform =
    // applicationFormService.createApplicationForm(applicationForm, user);
    // return ResponseEntity.ok(savedform);
    // }

    @PostMapping("/create")
    public ResponseEntity<ApplicationForm> applyForPolicy(
            @RequestBody ApplicationFormRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserbyJwt(jwt);

        ApplicationForm form = new ApplicationForm();
        form.setFirstName(request.getFirstName());
        form.setLastName(request.getLastName());
        form.setOccupation(request.getOccupation());
        form.setEmail(request.getEmail());
        form.setPhone(request.getPhone());
        form.setIncome(request.getIncome());
        form.setDateOfBirth(request.getDateOfBirth());
        form.setGender(request.getGender());
        form.setMarried(request.isMarried());
        form.setAddress(request.getAddress());
        form.setAadharFile(request.getAadharFile());
        form.setPanFile(request.getPanFile());
        form.setPinCode(request.getPinCode());

        ApplicationForm savedForm = applicationFormService.createApplicationForm(
                form, request.getPolicyId(), request.getCategoryId(), user);

        return ResponseEntity.ok(savedForm);
    }

    @PatchMapping("/update")
    public ResponseEntity<ApplicationForm> updateApplicationForm(@RequestBody ApplicationForm applicationForm,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserbyJwt(jwt);
        ApplicationForm savedForm = applicationFormService.updateApplicationForm(applicationForm, user);
        return ResponseEntity.ok(savedForm);
    }

    @DeleteMapping("/delete/{formId}")
    public ResponseEntity<ApiResponse> deleteApplicationForm(@PathVariable Long formId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserbyJwt(jwt);
        ApplicationForm form = applicationFormService.getApplicationFormByUser(formId, user.getId());
        applicationFormService.deleteApplicationForm(form, user);
        ApiResponse res = new ApiResponse();
        res.setMessage("Application Withdrawed successfully");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/review/{formId}")
    public ResponseEntity<ApplicationForm> reviewForm(@PathVariable Long formId,
            @RequestHeader("Authorization") String jwt, @RequestParam boolean approve) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        ApplicationForm applicationForm = applicationFormService.reviewForm(formId, seller, approve);
        return ResponseEntity.ok(applicationForm);
    }

    @GetMapping("user/{formId}")
    public ResponseEntity<ApplicationForm> getApplicationFormsByUserId(@PathVariable Long formId,
            @RequestHeader("Authorization") String jwt) throws Exception {
                User user = userService.findUserbyJwt(jwt);
        ApplicationForm forms = applicationFormService.getApplicationFormByUser(formId,user.getId());
        return ResponseEntity.ok(forms);
    }

    @GetMapping("/seller/{formId}")
    public ResponseEntity<ApplicationForm> getApplicationFormsBySellerId(@PathVariable Long fromId,@RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        
        ApplicationForm forms = applicationFormService.getApplicationFormBySeller(fromId,seller.getId());
        return ResponseEntity.ok(forms);
    }

    @GetMapping("/user/me")
    public ResponseEntity<List<ApplicationForm>> getMyApplications(@RequestHeader("Authorization") String jwt)
            throws Exception {
        User user = userService.findUserbyJwt(jwt);
        return ResponseEntity.ok(applicationFormService.getApplicationFormsByUserId(user.getId()));
    }

    @GetMapping("/seller/me")
    public ResponseEntity<List<ApplicationForm>> getMySellerApplications(@RequestHeader("Authorization") String jwt)
            throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        return ResponseEntity.ok(applicationFormService.getApplicationFormsBySellerId(seller.getId()));
    }

}
