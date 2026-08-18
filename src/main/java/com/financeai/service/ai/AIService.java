package com.financeai.service.ai;

import com.financeai.dto.ai.PredictRequest;
import com.financeai.dto.ai.PredictResponse;
import com.financeai.entity.Transaccion;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AIService {

    private final RestTemplate restTemplate;

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String obtenerCategoria(String descripcion) {
        String url = "https://apitorender.onrender.com/predict";

        PredictRequest request = new PredictRequest(descripcion);

        try {
            PredictResponse response = restTemplate.postForObject(
                    url,
                    request,
                    PredictResponse.class
            );

            if (response == null) {
                throw new RuntimeException("El modelo de IA no respondió. Intenta más tarde.");
            }

            return response.getCategoria();
        } catch (Exception e) {
            log.error("Error al conectar con el servicio de predicción: {}", e.getMessage());
            throw e;
        }
    }

    public String obtenerPerfilFinanciero(List<Transaccion> transacciones) {
        String url = "https://apitorender.onrender.com/analizar-finanzas";

        try {
            List<Map<String, Object>> listaTransacciones = transacciones.stream().map(t -> {
                Map<String, Object> map = new HashMap<>();
                map.put("usuarioId", t.getUsuario().getUsuarioId().toString());
                map.put("fecha", t.getFecha().toLocalDate().toString());
                map.put("tipo", t.getTipo());
                map.put("monto", t.getMonto());
                map.put("categoria", t.getCategoria().getNombre());
                return map;
            }).collect(Collectors.toList());

            Map<String, Object> payloadContenedor = new HashMap<>();
            payloadContenedor.put("transacciones", listaTransacciones);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payloadContenedor, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("Perfil financiero generado con éxito para {} transacciones.", transacciones.size());
                return response.getBody();
            } else {
                log.warn("La API de análisis respondió con código: {}", response.getStatusCode());
                return null;
            }
        } catch (Exception e) {
            log.error("Error al conectar con la API de analizar-finanzas: {}", e.getMessage());
            return "{\"error\": \"No se pudo analizar el perfil en este momento.\"}";
        }
    }
}