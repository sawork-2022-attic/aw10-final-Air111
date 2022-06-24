package com.micropos.order.model;

import com.micropos.dto.CartDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Order {

    private int id;
    private CartDto cartDto;
}
