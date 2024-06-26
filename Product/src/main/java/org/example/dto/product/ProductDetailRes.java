package org.example.dto.product;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.entity.Product;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ProductDetailRes {
    private Product product;
    private List<Product> productList;
    private boolean me;
    @Builder
    public ProductDetailRes(Product product, List<Product> productList,boolean me){
        this.product=product;
        this.productList=productList;
        this.me=me;
    }
}
