package com.synoradzki.paymoverecruitment.item;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ItemDTOMapper implements Function<Item, ItemResponseDTO> {
    @Override
    public ItemResponseDTO apply(Item item) {
        return new ItemResponseDTO(
                item.getItemId(),
                item.getOfferDate(),
                item.getItemName(),
                item.getItemDescription(),
                item.getPrice(),
                item.getSeller().getEmail(),
                item.getPurchaseDate(),
                item.getBuyer() != null ? item.getBuyer().getEmail() : null
        );
    }
}
