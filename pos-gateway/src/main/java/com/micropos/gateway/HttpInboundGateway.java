package com.micropos.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.http.dsl.Http;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.integration.http.inbound.HttpRequestHandlingMessagingGateway;

@Component
public class HttpInboundGateway {

//    @Bean
//    public IntegrationFlow inGate() {
//        return IntegrationFlows.from(
//                        Http.inboundGateway("/check/{orderId}")
//                                .headerExpression("orderId", "#pathVariables.orderId")
//                )
//                .headerFilter("accept-encoding", false)
//                .handle(((payload, headers) -> {
//                    Object orderId = headers.get("orderId");
//                    return orderId == null? -1: Integer.parseInt((String) orderId);
//                }))
//                .channel("deliveryCheckChannel")
//                .get();
//    }
}
