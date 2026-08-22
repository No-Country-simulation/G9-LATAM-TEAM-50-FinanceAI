# Finance AI Frontend

Frontend React + JavaScript para el backend Spring Boot de Finance AI.

## Funcionalidades

- Login y registro usando `/api/auth/login` y `/api/auth/register`.
- Dashboard con balance, ingresos, gastos, tasa de ahorro y flujo mensual.
- CRUD de transacciones usando `/api/transacciones`.
- Categorización automática: el backend asigna la categoría mediante su servicio de IA.
- Perfil financiero mediante `/api/perfil-financiero`.
- Persistencia de JWT en `localStorage`.
- Diseño responsive para escritorio y móvil.

## Requisitos

- Node.js 18+ recomendado.
- Backend Spring Boot activo en `http://localhost:8080`.
- CORS del backend configurado para `http://localhost:5173` (ya coincide con el proyecto entregado).

## Ejecución

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para cambiar la URL del backend, copia `.env.example` a `.env` y define `VITE_API_URL`.

## Contrato usado

El frontend consume los endpoints que actualmente expone el backend:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/transacciones`
- `POST /api/transacciones`
- `PUT /api/transacciones/{id}`
- `DELETE /api/transacciones/{id}`
- `GET /api/transacciones/{id}`
- `GET /api/transacciones/categoria/{categoriaId}`
- `GET /api/perfil-financiero`
