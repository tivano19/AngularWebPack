package com.myorga.code;

import static org.assertj.core.api.BDDAssertions.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ApplicationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Test
    public void contextLoads() throws Exception {
    }

    @Test
    public void shouldReturn200WhenSendingRequestToTest() throws Exception {
        @SuppressWarnings("rawtypes") ResponseEntity<String> entity = this.testRestTemplate.getForEntity(
                "http://localhost:" + this.port + "/myapp/users/test", String.class);

        then(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(entity.getBody()).isNotEmpty();
        then(entity.getBody()).isEqualTo("Hello World");
    }

}