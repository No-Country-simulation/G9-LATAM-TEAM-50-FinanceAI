# Diccionario de Datos — Análisis Financiero FinanceAI

## Descripción General

Este módulo analiza el comportamiento financiero de cada usuario a partir de sus transacciones previamente registradas y categorizadas.

El objetivo es transformar las transacciones financieras en indicadores que permitan evaluar de forma sencilla la situación financiera del usuario.

El módulo incluye:

- Cálculo de métricas financieras.
- Cálculo de scores financieros.
- Cálculo del Financial Score.
- Clasificación del perfil financiero.
- Variables utilizadas posteriormente para generar recomendaciones personalizadas.

---

## Flujo general

El proceso del módulo sigue el siguiente flujo:

**Transacciones categorizadas → Métricas base → Métricas derivadas → Scores → Financial Score → Perfil financiero → Recomendaciones**

---

# 1. Datos de entrada

El módulo recibe las transacciones financieras de los usuarios.

| Variable | Tipo de dato | Descripción | Ejemplo |
|---|---|---|---|
| `usuario_id` | Identificador | Identificador único del usuario. | `1025` |
| `Cantidad` | Numérico | Monto correspondiente a la transacción. | `850.50` |
| `Categoria` | Texto | Categoría asignada a la transacción de gasto. | `Compras` |
| `tipo_transaccion` | Texto | Identifica si la transacción corresponde a un ingreso o un gasto. | `Ingreso` / `Gasto` |

### Categorías de gasto

Las categorías utilizadas por el módulo son:

- Alimentación
- Compras
- Transporte
- Servicios
- Ocio
- Salud
- Vivienda
- Educación
- Otros

Los ingresos no se consideran una categoría de gasto. Se utilizan para calcular los ingresos totales del usuario.

---

# 2. Métricas base

Las métricas base resumen la información financiera de cada usuario.

| Variable | Fórmula | Descripción |
|---|---|---|
| `total_ingresos` | Suma de los ingresos del usuario | Suma de todos los ingresos registrados durante el periodo analizado. |
| `total_gastos` | Suma de los gastos del usuario | Suma de todos los gastos registrados durante el periodo analizado. |
| `num_transacciones` | Número de ingresos + número de gastos | Cantidad total de movimientos financieros registrados. |
| `gasto_promedio` | Total de gastos / número de transacciones de gasto | Cantidad promedio gastada en cada transacción de gasto. |
| `gasto_maximo` | Mayor gasto registrado | Mayor transacción de gasto realizada por el usuario. |
| `num_categorias` | Número de categorías distintas con gastos | Cantidad de categorías diferentes en las que el usuario realizó gastos. |

---

# 3. Métricas derivadas

A partir de las métricas base se calculan indicadores adicionales sobre el comportamiento financiero.

| Variable | Fórmula | Descripción |
|---|---|---|
| `ahorro` | Total de ingresos − Total de gastos | Dinero que permanece disponible después de restar los gastos a los ingresos. |
| `tasa_ahorro` | Ahorro / Total de ingresos | Proporción de los ingresos que permanece disponible después de cubrir los gastos. |
| `ratio_gasto` | Total de gastos / Total de ingresos | Proporción de los ingresos que se utiliza para cubrir gastos. |
| `frecuencia_gastos` | Número de transacciones de gasto | Número de transacciones clasificadas como gastos. |
| `porcentaje` | Gasto en la categoría / Total de gastos | Proporción del gasto total correspondiente a una categoría específica. |
| `categoria_principal` | Categoría con el mayor porcentaje de gasto | Categoría en la que el usuario concentra la mayor proporción de sus gastos. |
| `porcentaje_categoria_principal` | Mayor porcentaje de gasto entre las categorías | Proporción del gasto total correspondiente a la categoría principal. |

> `porcentaje` se utiliza como cálculo intermedio para determinar la categoría principal.

---

# 4. Scores financieros

El comportamiento financiero del usuario se transforma en cuatro componentes de puntuación.

## 4.1 Score de ahorro

Variable:

`score_ahorro`

El score de ahorro se determina a partir de la tasa de ahorro.

| Condición | Puntos |
|---|---:|
| Tasa de ahorro ≥ 40 % | 35 |
| 20 % ≤ Tasa de ahorro < 40 % | 28 |
| 10 % ≤ Tasa de ahorro < 20 % | 18 |
| 0 % ≤ Tasa de ahorro < 10 % | 8 |
| Tasa de ahorro < 0 % | 0 |

**Puntaje máximo: 35 puntos.**

---

## 4.2 Score de gasto

Variable:

`score_gasto`

El score de gasto se determina a partir del ratio gasto / ingreso.

| Condición | Puntos |
|---|---:|
| Ratio gasto / ingreso ≤ 50 % | 30 |
| 50 % < Ratio gasto / ingreso ≤ 70 % | 24 |
| 70 % < Ratio gasto / ingreso ≤ 90 % | 18 |
| 90 % < Ratio gasto / ingreso ≤ 100 % | 10 |
| Ratio gasto / ingreso > 100 % | 0 |

**Puntaje máximo: 30 puntos.**

---

## 4.3 Score de diversificación

Variable:

`score_diversificacion`

Se determina según el número de categorías diferentes en las que el usuario realiza gastos.

| Número de categorías | Puntos |
|---|---:|
| 8 o más | 20 |
| 5 a 7 | 15 |
| 3 a 4 | 10 |
| Menos de 3 | 5 |

**Puntaje máximo: 20 puntos.**

---

## 4.4 Score de frecuencia

Variable:

`score_frecuencia`

Se determina según la cantidad de transacciones de gasto realizadas por el usuario.

| Número de gastos | Puntos |
|---|---:|
| 10 gastos o menos | 15 |
| 11 a 20 gastos | 12 |
| 21 a 30 gastos | 8 |
| 31 a 40 gastos | 4 |
| Más de 40 gastos | 0 |

**Puntaje máximo: 15 puntos.**

---

# 5. Financial Score

Variable:

`financial_score`

El Financial Score resume el comportamiento financiero del usuario mediante la suma de los cuatro scores:

**Financial Score = Score de ahorro + Score de gasto + Score de diversificación + Score de frecuencia**

Los puntajes máximos son:

- Ahorro: 35 puntos
- Gasto: 30 puntos
- Diversificación: 20 puntos
- Frecuencia: 15 puntos

**Puntaje máximo: 100 puntos.**

Un Financial Score más alto representa una situación financiera más favorable.

---

# 6. Perfil financiero

Variable:

`perfil_financiero`

El perfil financiero se asigna utilizando el Financial Score.

| Perfil | Regla | Interpretación |
|---|---|---|
| **Saludable** | Financial Score ≥ 70 | El usuario presenta una buena administración de sus recursos y una situación financiera favorable. |
| **En observación** | 40 ≤ Financial Score < 70 | El usuario presenta una situación financiera intermedia y existen oportunidades para mejorar sus hábitos financieros. |
| **En riesgo** | Financial Score < 40 | El usuario presenta indicadores que pueden comprometer su estabilidad financiera y requieren mayor atención. |

---

# 7. Variables utilizadas para recomendaciones

El módulo de recomendaciones utiliza los resultados obtenidos durante el análisis financiero.

| Variable | Descripción |
|---|---|
| `financial_score` | Puntaje financiero global del usuario. |
| `perfil_financiero` | Perfil financiero asignado al usuario. |
| `score_ahorro` | Puntaje obtenido en la dimensión de ahorro. |
| `score_gasto` | Puntaje obtenido en la dimensión de gasto. |
| `score_diversificacion` | Puntaje obtenido según la distribución de los gastos. |
| `score_frecuencia` | Puntaje obtenido según la frecuencia de gastos. |
| `categoria_principal` | Categoría donde el usuario concentra la mayor proporción de sus gastos. |
| `porcentaje_categoria_principal` | Proporción del gasto total correspondiente a la categoría principal. |

---

# 8. Salidas principales

El módulo genera como principales resultados:

| Variable | Resultado |
|---|---|
| `score_ahorro` | Score de ahorro del usuario. |
| `score_gasto` | Score relacionado con el nivel de gasto. |
| `score_diversificacion` | Score relacionado con la distribución del gasto. |
| `score_frecuencia` | Score relacionado con la frecuencia de gastos. |
| `financial_score` | Financial Score de 0 a 100. |
| `perfil_financiero` | Saludable, En observación o En riesgo. |
| `categoria_principal` | Categoría donde se concentra el mayor gasto. |
| `porcentaje_categoria_principal` | Proporción del gasto total correspondiente a la categoría principal. |

---

# 9. Relación con el módulo de categorización

Este módulo utiliza las transacciones que previamente han sido clasificadas en categorías de gasto.

El modelo de categorización identifica la categoría de una transacción a partir de su descripción.

Posteriormente, el módulo de análisis financiero utiliza esas categorías para calcular métricas como:

- Número de categorías.
- Porcentaje de gasto por categoría.
- Categoría principal.
- Porcentaje de la categoría principal.
- Score de diversificación.

De esta manera, ambos módulos forman parte del flujo general de FinanceAI:

**Descripción de transacción → Categoría → Análisis financiero → Financial Score → Perfil financiero → Recomendaciones**
