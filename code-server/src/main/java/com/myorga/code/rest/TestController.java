package com.myorga.code.rest;

import com.myorga.code.security.JwtAuthenticationResponse;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("/users")
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    //@Value("${myapp.env.lounes}")
    private String envValueProperties = "";

    private int nbCall = 0;

    @PostConstruct
    public void testWorkingDir(){
        String userDir = System.getProperty("user.dir");

        logger.info("-----  User Dir: " + userDir);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("Hello World");
    }

    @GetMapping
    public ResponseEntity<?> getUsers() {

        Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP");

        logger.info("envValueProperties : " + envValueProperties);
        List<User> users = new ArrayList<User>();
        users.add(new User(1L, "lb.lounes", "DONE", "rcompute", Arrays.asList("RECOMPUTE")));
        users.add(new User(2L, "lb.lounes2", "READY", "recompute, validate", Arrays.asList("RECOMPUTE", "VALIDATE")));
        users.add(new User(3L, "lb.lounes3", "ERROR", "recompute, validate, process", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS")));
        users.add(new User(4L, "lb.lounes3", "WAITING", "validate, process, skip", Arrays.asList("VALIDATE", "PROCESS", "SKIP")));
        users.add(new User(5L, "lb.lounes3", "IN_PROGRESS", "recompute, process, skip", Arrays.asList("RECOMPUTE", "PROCESS", "SKIP")));
        users.add(new User(6L, "lb.lounes", "DONE", "validate, process", Arrays.asList( "VALIDATE", "PROCESS")));

        for(int i =0; i<333; i++){
            users.add(new User(11L, "lb.lounes", "DONE", "all", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
            users.add(new User(22L, "lb.lounes2", "READY", "all", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
            users.add(new User(33L, "lb.lounes3", "ERROR", "all", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
            users.add(new User(44L, "lb.lounes3", "WAITING", "all",Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
            users.add(new User(55L, "lb.lounes3", "IN_PROGRESS", "all", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
            users.add(new User(66L, "lb.lounes3", "DELETED", "all", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
            users.add(new User(77L, "lb.lounes3", "OUT_SCOPED", "all", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));
        }

        users.add(new User(99L, "99", "DONE", "all@", Arrays.asList("RECOMPUTE", "VALIDATE", "PROCESS", "SKIP")));

        logger.info(users.get(2).getUsername());
        return ResponseEntity.ok(users);
    }

    @PostMapping("/processing")
    public ResponseEntity<?> processing(@RequestParam Integer id) {
        nbCall++;
        logger.info("Nb Call for prossing Id : " + nbCall);

        List<DetailUser> users = new ArrayList<DetailUser>();
        users.add(new DetailUser(1233, 444, "switch from server 1", 1, "Direction 1"));
        users.add(new DetailUser(1234, 222, "switch from server 2", 2, "Direction 2"));
        return ResponseEntity.ok(users);
    }

    @PostMapping("/details")
    public ResponseEntity<?> detUserDetail(@RequestParam Integer id, @RequestParam String strparam) {
        logger.info("id: " + id + ", strparam: " + strparam);

        logger.info("Get User deatils");
        List<DetailUser> users = new ArrayList<DetailUser>();

            users.add(new DetailUser(1233, 444, "switch from server 1", 1, "Direction 1"));
            users.add(new DetailUser(1234, 222, "switch from server 2", 2, "Direction 2"));
            users.add(new DetailUser(1235, 111, "switch from server 3", 3, "Direction 3"));
            users.add(new DetailUser(1236, 555, "switch from server 4", 4, "Direction 4"));
            users.add(new DetailUser(1237, 666, "switch from server 5", 5, "Direction 5"));
            users.add(new DetailUser(1238, 777, "switch from server 6", 6, "Direction 6"));
            users.add(new DetailUser(1239, 100, "switch from server 7", 7, "Direction 7"));
            users.add(new DetailUser(1230, 300, "switch from server 8", 8, "Direction 8"));
            users.add(new DetailUser(1231, 400, "switch from server 9", 9, "Direction 9"));
            users.add(new DetailUser(1232, 500, "switch from server 10", 10, "Direction 10"));


        logger.info("load details id {}", users.get(2).getCallId());
        return ResponseEntity.ok(users);
    }

    @Data
    public class User{

        private int i = 0;

        private String fiel1 = "fiel1" + i++;
        private String fiel2 = "fiel1" + i++;
        private String fiel3 = "fiel1" + i++;
        private String fiel4 = "fiel1" + i++;
        private String fiel5 = "fiel1" + i++;
        private String fiel6 = "fiel1" + i++;
        private String fiel7 = "fiel1" + i++;
        private String fiel8 = "fiel1" + i++;
        private String fiel9 = "fiel1" + i++;
        private String fiel10 = "fiel1" + i++;
        private String fiel11 = "fiel1" + i++;
        private String fiel12 = "fiel1" + i++;
        private String fiel13 = "fiel1" + i++;
        private String fiel14 = "fiel1" + i++;
        private String fiel15 = "fiel1" + i++;
        private String fiel16 = "fiel1" + i++;
        private String fiel17 = "fiel1" + i++;
        private String fiel18 = "fiel1" + i++;
        private String fiel19 = "fiel1" + i++;
        private String fiel20 = "fiel1" + i++;
        private String fiel21 = "fiel1" + i++;
        private String fiel22 = "fiel1" + i++;
        private String fiel23 = "fiel1" + i++;
        private String fiel24 = "fiel1" + i++;
        private String fiel25 = "fiel1" + i++;
        private String fiel26 = "fiel1" + i++;
        private String fiel27 = "fiel1" + i++;
        private String fiel28 = "fiel1" + i++;
        private String fiel29 = "fiel1" + i++;
        private String fiel30 = "fiel1" + i++;

        private Long id;

        private String username;

        private String firstName;

        private String lastName;

        private List<String> actionsPossible = new ArrayList<String>();

        public User(Long id, String username, String firstName, String lastName, List<String> actionsPossible) {
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.actionsPossible = actionsPossible;
        }
    }
}
