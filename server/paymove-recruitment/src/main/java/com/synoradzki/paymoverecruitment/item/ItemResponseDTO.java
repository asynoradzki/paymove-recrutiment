package com.synoradzki.paymoverecruitment.item;

import java.time.LocalDate;

public record ItemResponseDTO(
       Long itemId,
       LocalDate offerDate,
       String itemName,
       String itemDescription,
       Integer price,
       String sellerEmail,
       LocalDate purchaseDate,
       String buyerEmail
) {
}
