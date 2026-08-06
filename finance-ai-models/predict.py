import re
import string
import joblib


# ==========================
# Cargar objetos entrenados
# ==========================

modelo = joblib.load("modelos/modelo_linear_svc.pkl")
vectorizer = joblib.load("modelos/tfidf_vectorizer.pkl")
encoder = joblib.load("modelos/label_encoder.pkl")


# ==========================
# Limpieza del texto
# ==========================

def limpiar_texto(texto):
    """
    Limpia una descripción de transacción.
    """

    texto = str(texto).lower()
    texto = re.sub(r"\s+", " ", texto)
    texto = texto.translate(
        str.maketrans("", "", string.punctuation)
    )

    return texto.strip()


# ==========================
# Predicción
# ==========================

def clasificar_transaccion(descripcion):
    """
    Clasifica una transacción y devuelve su categoría.

    Parámetros
    ----------
    descripcion : str
        Descripción de la transacción.

    Retorna
    -------
    str
        Categoría predicha.
    """

    # Limpiar texto
    texto = limpiar_texto(descripcion)

    # Vectorizar
    texto_vectorizado = vectorizer.transform([texto])

    # Predicción
    categoria_id = modelo.predict(texto_vectorizado)

    # Convertir a texto
    categoria = encoder.inverse_transform(categoria_id)

    return categoria[0]


# ==========================
# Prueba rápida
# ==========================

if __name__ == "__main__":

    descripcion = "uber viaje aeropuerto"

    categoria = clasificar_transaccion(descripcion)

    print(f"Descripción: {descripcion}")
    print(f"Categoría: {categoria}")