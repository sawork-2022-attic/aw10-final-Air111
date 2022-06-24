package com.micropos.order.rest;

import com.micropos.api.OrderApi;
import com.micropos.dto.CartDto;
import com.micropos.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api")
public class OrderController implements OrderApi {

    private OrderService orderService;

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    @CrossOrigin
    public Mono<ResponseEntity<Double>> checkout(Mono<CartDto> cartDto, ServerWebExchange exchange) {
        return cartDto
                .map(orderService::checkout)
                .map(res -> {
                    if (res < 0)
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                    else
                        return new ResponseEntity<>(res, HttpStatus.OK);
                });
    }
}
