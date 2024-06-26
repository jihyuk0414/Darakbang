package org.example.dto.purchase;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;


import java.time.LocalDate;


@Data
@RequiredArgsConstructor
public class PaymentsReq {
    private String seller;
    private String consumer;
    private int product_point;
    private Long product_id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate purchase_at;

}
