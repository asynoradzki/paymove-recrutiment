package com.synoradzki.paymoverecruitment.item;

import com.synoradzki.paymoverecruitment.security.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByBuyerIsNullOrderByOfferDate();

    List<Item> findBySellerEqualsOrderByOfferDate(AppUser user);

    List<Item> findByBuyerEqualsOrderByOfferDate(AppUser user);
}
