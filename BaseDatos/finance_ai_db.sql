-- =============================================================================
-- 1. CREACIÓN DE LA BASE DE DATOS
-- =============================================================================
CREATE DATABASE finance_ai;

-- =============================================================================
-- 2. CREACIÓN DE TABLAS (En orden secuencial de dependencias)
-- =============================================================================

-- Tabla Categoria
CREATE TABLE categoria (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    tipo VARCHAR(30) NOT NULL
);

-- Tabla Usuario
CREATE TABLE usuario (
    usuario_id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    documento VARCHAR(50) NOT NULL, 
    edad INT NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    
    -- Campos de Auditoría
    register_user_id VARCHAR(100),
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_register VARCHAR(45),
    user_edit VARCHAR(100),
    edit_date TIMESTAMP, 
    ip_edit VARCHAR(45)
);

-- Tabla Transacción
CREATE TABLE transaccion (
    transaccion_id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    monto NUMERIC(12, 2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(30) NOT NULL,

    -- Claves Foráneas
    categoria_id INT NOT NULL,
    usuario_id INT NOT NULL,

    -- Campos de Auditoría
    register_user_id VARCHAR(100),
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_register VARCHAR(45),
    user_edit VARCHAR(100),
    edit_date TIMESTAMP, 
    ip_edit VARCHAR(45),

    CONSTRAINT fk_transaccion_categoria
        FOREIGN KEY (categoria_id) REFERENCES categoria (categoria_id),

    CONSTRAINT fk_transaccion_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
);

-- Tabla Historial Financiero
CREATE TABLE historial_financiero (
    historial_id SERIAL PRIMARY KEY,
    ingresos NUMERIC(12, 2) DEFAULT 0.00,
    gastos NUMERIC(12, 2) DEFAULT 0.00,
    ahorro NUMERIC(12, 2) DEFAULT 0.00,
    balance NUMERIC(12, 2) DEFAULT 0.00,
    periodo VARCHAR(50),
    riesgo VARCHAR(30) NOT NULL,

    -- Clave Foránea
    usuario_id INT NOT NULL,

    CONSTRAINT fk_historial_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
);

-- Tabla Análisis
CREATE TABLE analisis (
    analisis_id SERIAL PRIMARY KEY,
    observaciones TEXT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    perfil VARCHAR(50),
    puntaje NUMERIC(5, 2),
    riesgo VARCHAR(30) NOT NULL,

    -- Clave Foránea
    usuario_id INT NOT NULL,

    CONSTRAINT fk_analisis_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
);

-- Tabla Recomendación
CREATE TABLE recomendacion (
    recomendacion_id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    estado BOOLEAN DEFAULT TRUE,
    prioridad VARCHAR(30) NOT NULL,

    -- Clave Foránea
    analisis_id INT NOT NULL,

    CONSTRAINT fk_recomendacion_analisis
        FOREIGN KEY (analisis_id) REFERENCES analisis (analisis_id)
);

-- Tabla KPIs
CREATE TABLE kpis (
    kpis_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    valor NUMERIC(12, 2) NOT NULL,
    unidad VARCHAR(20),
    descripcion TEXT,
    
    -- Clave Foránea
    analisis_id INT NOT NULL,

    CONSTRAINT fk_kpis_analisis 
        FOREIGN KEY (analisis_id) REFERENCES analisis (analisis_id)
);


/* 
=============================================================================
3. DESCRIPCIÓN Y VALORES PERMITIDOS DE ENUMS (Manejo en Backend)
=============================================================================

1. Categoria -> tipo
   Valores posibles:
   - 'INGRESO' : Representa entradas de dinero (Sueldo, Ventas, Inversiones).
   - 'EGRESO'  : Representa salidas de dinero o gastos (Servicios, Comida).

2. Usuario -> rol
   Valores posibles:
   - 'ADMIN'   : Administrador del sistema con acceso total.
   - 'CLIENTE' : Usuario final que gestiona sus finanzas personales.

3. Transaccion -> metodo_pago
   Valores posibles:
   - 'EFECTIVO'        : Pagos en físico.
   - 'TARJETA_CREDITO' : Cargo a tarjeta de crédito.
   - 'TARJETA_DEBITO'  : Cargo a tarjeta de débito.
   - 'TRANSFERENCIA'   : Transferencia bancaria o electrónica (ej. PSE).

4. Historial Financiero / Analisis -> riesgo
   Valores posibles:
   - 'BAJO'    : Nivel de riesgo mínimo / perfil financiero estable.
   - 'MEDIO'   : Nivel de riesgo moderado.
   - 'ALTO'    : Nivel de riesgo elevado / hábitos financieros críticos.
   - 'CRITICO' : Situación de endeudamiento o vulnerabilidad alta.

5. Analisis -> perfil
   Valores posibles:
   - 'CONSERVADOR' : Prefiere la seguridad financiera sobre la rentabilidad.
   - 'MODERADO'    : Balance entre seguridad y crecimiento.
   - 'AGRESIVO'    : Busca altos rendimientos aceptando mayor volatilidad.

6. Recomendacion -> prioridad
   Valores posibles:
   - 'BAJA'  : Acción sugerida sin impacto inmediato.
   - 'MEDIA' : Acción recomendable a mediano plazo.
   - 'ALTA'  : Acción urgente requerida para corregir la salud financiera.

=============================================================================
*/