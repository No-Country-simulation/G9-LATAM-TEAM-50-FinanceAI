package com.financeai.service.ai;

import com.financeai.dto.ai.PredictRequest;
import com.financeai.dto.ai.PredictResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    private final RestTemplate restTemplate;

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String obtenerCategoria(String descripcion) {
        String url = "http://localhost:8000/clasificar";

        PredictRequest request =
                new PredictRequest(descripcion);

        PredictResponse response =
                restTemplate.postForObject(
                        url,
                        request,
                        PredictResponse.class
                );

        if(response == null) {
            throw new RuntimeException("El modelo de IA no respondió. Intenta más tarde.");
        }

        return response.getCategoria();
    }
}
