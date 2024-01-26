package com.synoradzki.paymoverecruitment.item;

public record ItemCreateDTO(
        String itemName,
        String itemDescription,
        Integer price,
        String sellerEmail
) {
}
