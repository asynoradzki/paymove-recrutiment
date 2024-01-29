package com.synoradzki.paymoverecruitment.item;

import com.synoradzki.paymoverecruitment.exception.EntityNotFoundException;
import com.synoradzki.paymoverecruitment.exception.NoAuthorizationException;
import com.synoradzki.paymoverecruitment.security.config.JwtService;
import com.synoradzki.paymoverecruitment.security.user.AppUser;
import com.synoradzki.paymoverecruitment.security.user.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final AppUserRepository userRepository;
    private final ItemDTOMapper itemDTOMapper;
    private final JwtService jwtService;

    public List<ItemResponseDTO> getAvailableItems() {
        List<Item> items = itemRepository.findByBuyerIsNull();

        return items.stream()
                .map(itemDTOMapper).toList();
    }

    public List<ItemResponseDTO> getOfferedItems(String email) throws EntityNotFoundException {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("email not found in database"));

        List<Item> items = itemRepository.findBySellerEquals(user);

        return items.stream()
                .map(itemDTOMapper)
                .toList();
    }


    public List<ItemResponseDTO> getPurchasedItems(String email) throws EntityNotFoundException {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("email not found in database"));

        List<Item> items = itemRepository.findByBuyerEquals(user);

        return items.stream()
                .map(itemDTOMapper)
                .toList();
    }

    public ItemResponseDTO addItem(ItemCreateDTO itemCreateDTO) throws EntityNotFoundException {

        AppUser user = userRepository.findByEmail(itemCreateDTO.sellerEmail())
                .orElseThrow(() -> new EntityNotFoundException("email not found in database"));

        Item item = Item.builder()
                .offerDate(LocalDate.now())
                .itemName(itemCreateDTO.itemName())
                .itemDescription(itemCreateDTO.itemDescription())
                .price(itemCreateDTO.price())
                .seller(user)
                .buyer(null)
                .purchaseDate(null)
                .build();

        return itemDTOMapper.apply(itemRepository.save(item));
    }

    @Transactional
    public ItemResponseDTO buyItem(Long itemId, String email) throws EntityNotFoundException {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("email not found in database"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("item not found in database"));

        item.setBuyer(user);
        item.setPurchaseDate(LocalDate.now());

        return itemDTOMapper.apply(item);

    }

    public ItemResponseDTO deleteItem(Long itemId, String token) throws EntityNotFoundException, NoAuthorizationException {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("item not found in database"));

        if (!(item.getSeller().getEmail().equals(getUserEmail(token)) || getUserRole(token).equals("ADMIN"))) {
            throw new NoAuthorizationException("only item owner or user with role \"Admin\" can delete item");
        }

        itemRepository.deleteById(itemId);

        return itemDTOMapper.apply(item);
    }

    private String getUserEmail(String token) {
        String jwt = jwtService.getJWT(token);
        return jwtService.extractUsername(jwt);
    }

    private String getUserRole(String token) {
        String jwt = jwtService.getJWT(token);
        return jwtService.extractUserRole(jwt);
    }


}
