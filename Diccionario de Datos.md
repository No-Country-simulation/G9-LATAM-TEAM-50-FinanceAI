# Diccionario de Datos

## Dataset: `dataset_transacciones_latam_final_8000.csv`

### Descripción General

Este dataset sintético contiene **8,000 transacciones financieras** simuladas de usuarios de Latinoamérica. Su propósito es servir como conjunto de entrenamiento para un modelo de Machine Learning capaz de clasificar automáticamente las transacciones según su categoría de gasto.

Cada registro representa una transacción individual y está compuesto por una descripción textual y su categoría correspondiente.

---

## Estructura del Dataset

| Columna | Tipo de dato | Descripción | Ejemplo |
|----------|-------------|-------------|---------|
| `descripcion` | Texto (string) | Descripción de la transacción realizada. Generalmente contiene el nombre del comercio, institución financiera o una breve descripción del movimiento. | `uber viaje aeropuerto`, `oxxo centro`, `spotify premium`, `farmacias similares` |
| `categoria` | Texto (string) | Categoría asignada a la transacción. Esta columna corresponde a la variable objetivo (target) utilizada durante el entrenamiento del modelo de clasificación. | `Transporte`, `Alimentación`, `Salud` |

---

## Categorías Disponibles

El dataset contiene las siguientes categorías de clasificación:

| Categoría | Descripción |
|------------|-------------|
| Alimentación | Compras relacionadas con alimentos, supermercados, restaurantes y establecimientos de comida. |
| Compras | Compras generales de productos físicos o digitales que no pertenecen a otra categoría específica. |
| Educación | Gastos asociados a colegiaturas, cursos, libros, plataformas educativas y materiales de aprendizaje. |
| Ocio | Gastos en entretenimiento, streaming, videojuegos, cine, conciertos y actividades recreativas. |
| Otros | Transacciones que no pueden clasificarse claramente en alguna de las categorías anteriores. |
| Salud | Pagos relacionados con hospitales, consultas médicas, farmacias, laboratorios y servicios de salud. |
| Servicios | Pago de servicios como internet, telefonía, electricidad, agua, gas, suscripciones y otros servicios recurrentes. |
| Transporte | Gastos relacionados con gasolina, transporte público, taxis, aplicaciones de movilidad, vuelos y peajes. |
| Vivienda | Gastos relacionados con renta, mantenimiento, hipoteca, administración y servicios asociados a la vivienda. |

---

## Variable Objetivo

La variable objetivo utilizada para el entrenamiento del modelo es:

| Variable | Tipo |
|----------|------|
| `categoria` | Categórica |

Durante el preprocesamiento esta variable fue transformada mediante un **LabelEncoder** para convertir cada categoría en un identificador numérico utilizado por los algoritmos de Machine Learning.

---

## Variables Derivadas (Preprocesamiento)

Durante la etapa de preparación de datos se generaron las siguientes variables auxiliares:

| Variable | Descripción |
|----------|-------------|
| `descripcion_limpia` | Versión normalizada de la descripción original, convertida a minúsculas y sin signos de puntuación. Utilizada como entrada para el proceso de vectorización TF-IDF. |
| `categoria_id` | Representación numérica de la categoría obtenida mediante `LabelEncoder`. |

Estas variables no forman parte del dataset original, sino que son generadas durante el pipeline de preprocesamiento.

---

## Observaciones

- El dataset es completamente sintético y fue diseñado con fines educativos y de experimentación.
- Cada registro corresponde a una única transacción financiera.
- El modelo desarrollado utiliza exclusivamente la columna `descripcion` como variable de entrada.
- La columna `categoria` representa la etiqueta correcta utilizada durante el entrenamiento supervisado.
- Posteriormente, las descripciones son transformadas mediante la técnica **TF-IDF (Term Frequency–Inverse Document Frequency)** antes del entrenamiento de los modelos de Machine Learning.

---

## Resumen

| Característica | Valor |
|----------------|-------|
| Número de registros | 8,000 |
| Número de variables originales | 2 |
| Variable de entrada | `descripcion` |
| Variable objetivo | `categoria` |
| Tipo de aprendizaje | Clasificación Supervisada |
| Técnica de vectorización | TF-IDF |
| Modelos evaluados | Regresión Logística, LinearSVC, Multinomial Naive Bayes |
| Modelo seleccionado | LinearSVC |