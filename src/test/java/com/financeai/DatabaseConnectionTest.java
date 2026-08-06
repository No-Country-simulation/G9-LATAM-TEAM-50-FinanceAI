package com.financeai;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class DatabaseConnectionTest {

    @Autowired
    private DataSource dataSource;

    @Test
    void testConnectionToSupabase() {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("==========================================");
            System.out.println(" ¡CONEXIÓN EXITOSA A SUPABASE!");
            System.out.println("Base de datos: " + connection.getCatalog());
            System.out.println("Driver: " + connection.getMetaData().getDriverName());
            System.out.println("==========================================");

            assertNotNull(connection);
            assertFalse(connection.isClosed());
        } catch (SQLException e) {
            System.err.println(" ERROR AL CONECTAR A SUPABASE: " + e.getMessage());
            e.printStackTrace();
        }
    }
}