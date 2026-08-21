FROM eclipse-temurin:17-jdk-jammy
ARG JAR_FILE=target/finance_ai-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_prueba.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_prueba.jar"]