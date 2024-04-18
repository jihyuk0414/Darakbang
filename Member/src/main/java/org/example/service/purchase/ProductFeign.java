package org.example.service.purchase;

import org.example.dto.ProductFeignReq;
import org.example.dto.ProductFeignRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
//@FeignClient(name = "ProductApi",url = "http://darakbang-product-service-1:7080/product")
public interface ProductFeign {
    @PostMapping("/payments/sell")
    public ProductFeignRes SoldOut(@RequestBody ProductFeignReq productFeignReq);

}