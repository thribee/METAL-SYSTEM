package com.metalsystem.backend.controller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@WebMvcTest(StatusController.class)
class StatusControllerTest {
 @Autowired MockMvc mvc;
 @Test void statusOnline() throws Exception {mvc.perform(get("/api/status")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("online"));}
}
