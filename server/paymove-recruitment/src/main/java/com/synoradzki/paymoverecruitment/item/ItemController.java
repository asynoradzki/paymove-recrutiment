package com.synoradzki.paymoverecruitment.item;

import com.synoradzki.paymoverecruitment.exception.EntityNotFoundException;
import com.synoradzki.paymoverecruitment.exception.NoAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/items")
@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /**
     *
     * @return a list of items for sale. Endpoint for unauthorized users
     *
     * ItemResponseDTO(
     *        Long itemId,
     *        LocalDate offerDate,
     *        String itemName,
     *        String itemDescription,
     *        Integer price,
     *        String sellerEmail,
     *        LocalDate purchaseDate,
     *        String buyerEmail
     * )
     */
    @GetMapping("/all")
    public ResponseEntity<List<ItemResponseDTO>> getAvailableItems() {
        return new ResponseEntity<>(itemService.getAvailableItems(), HttpStatus.OK);
    }

    /**
     * Displays items offered for sale by the chosen user identified by email
     * Endpoint for authenticated users
     *
     * @param email as String
     * @return ItemResponseDTO List
     *
     * ItemResponseDTO(
     *        Long itemId,
     *        LocalDate offerDate,
     *        String itemName,
     *        String itemDescription,
     *        Integer price,
     *        String sellerEmail,
     *        LocalDate purchaseDate,
     *        String buyerEmail
     * )
     *
     * @throws EntityNotFoundException if user does not exist in database. Status code 404.
     *                                  error message: "email not found in database"
     */
    @GetMapping("/offered")
    public ResponseEntity<List<ItemResponseDTO>> getOfferedItems(
            @RequestParam String email
    ) throws EntityNotFoundException {
        return new ResponseEntity<>(itemService.getOfferedItems(email), HttpStatus.OK);
    }

    /**
     * Displays purchased items by the chosen user identified by email
     * Endpoint for authenticated users
     *
     * @param email as String
     * @return ItemResponseDTO List
     * ItemResponseDTO(
     *        Long itemId,
     *        LocalDate offerDate,
     *        String itemName,
     *        String itemDescription,
     *        Integer price,
     *        String sellerEmail,
     *        LocalDate purchaseDate,
     *        String buyerEmail
     * )
     * @throws EntityNotFoundException if user does not exist in database. Status code 404.
     *                                  error message: "email not found in database"
     */
    @GetMapping("/purchased")
    public ResponseEntity<List<ItemResponseDTO>> getPurchasedItems(
            @RequestParam String email
    ) throws EntityNotFoundException {
        return new ResponseEntity<>(itemService.getPurchasedItems(email), HttpStatus.OK);
    }

    /**
     * The method allows authenticated users to add items for sale
     * Endpoint for authenticated users
     *
     * @param itemCreateDTO
     * ItemCreateDTO(
     *         String itemName,
     *         String itemDescription,
     *         Integer price,
     *         String sellerEmail
     * )
     *
     * @return
     * ItemResponseDTO(
     *        Long itemId,
     *        LocalDate offerDate,
     *        String itemName,
     *        String itemDescription,
     *        Integer price,
     *        String sellerEmail,
     *        LocalDate purchaseDate,
     *        String buyerEmail
     * )
     *
     * @throws EntityNotFoundException if user does not exist in database. Status code 404.
     *                                  error message: "email not found in database"
     */
    @PostMapping("/")
    public ResponseEntity<ItemResponseDTO> addItem(
            @RequestBody ItemCreateDTO itemCreateDTO
    ) throws EntityNotFoundException {
        return new ResponseEntity<>(itemService.addItem(itemCreateDTO), HttpStatus.OK);
    }

    /**
     * Allows authenticated users to buy products
     *
     * @param itemId the id of the product the user wants to buy as path variable
     * @param email user email
     * @return purchased product as
     * ItemResponseDTO(
     *        Long itemId,
     *        LocalDate offerDate,
     *        String itemName,
     *        String itemDescription,
     *        Integer price,
     *        String sellerEmail,
     *        LocalDate purchaseDate,
     *        String buyerEmail
     * )
     *
     * @throws EntityNotFoundException if user or item does not exist in database. Status code 404.
     *                                  error message: "email not found in database"
     *                                  error message: "item not found in database"
     */

    @PatchMapping("/buy/{item_id}")
    public ResponseEntity<ItemResponseDTO> buyItem(
            @PathVariable("item_id") Long itemId,
            @RequestParam String email
    ) throws EntityNotFoundException {
        return new ResponseEntity<>(itemService.buyItem(itemId, email), HttpStatus.OK);
    }

    /**
     *
     * @param token the token is used to verify the user. Only item owner or users with role ADMIN can delete products
     * @param itemId item id to be deleted
     * @return deleted product
     * ItemResponseDTO(
     *        Long itemId,
     *        LocalDate offerDate,
     *        String itemName,
     *        String itemDescription,
     *        Integer price,
     *        String sellerEmail,
     *        LocalDate purchaseDate,
     *        String buyerEmail
     * )
     * @throws NoAuthorizationException status code 403 if the user has no right to modify.
     *                                  error message: "only item owner or user with role "Admin" can delete item"
     * @throws EntityNotFoundException if item does not exist in database. Status code 404.
     *                                  error message: "item not found in database"
     */
    @DeleteMapping("/{item_id}")
    public ResponseEntity<ItemResponseDTO> deleteItem(
            @RequestHeader("Authorization") String token,
            @PathVariable("item_id") Long itemId
    ) throws NoAuthorizationException, EntityNotFoundException {
        return new ResponseEntity<>(itemService.deleteItem(itemId, token), HttpStatus.OK);
    }

}
