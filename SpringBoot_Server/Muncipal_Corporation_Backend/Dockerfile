# ---------- STAGE 1: BUILD ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

# Copy manifest and source
COPY pom.xml .
COPY src ./src

# Build the JAR (Skip tests to speed up deployment)
RUN mvn clean package -DskipTests

# ---------- STAGE 2: RUNTIME ----------
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /build/target/*.jar app.jar

# Expose port 8080 (Matches the server.port config)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java","-jar","app.jar"]