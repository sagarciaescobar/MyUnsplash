package com.dev.myunsplash;

import com.dev.myunsplash.model.AppUser;
import com.dev.myunsplash.model.Role;
import com.dev.myunsplash.service.UserServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class MyunsplashApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyunsplashApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	/*@Bean
	CommandLineRunner run(UserServiceImpl userService){
		return args -> {
			userService.saveRole(new Role(null,"ROLE_USER"));
			userService.saveRole(new Role(null,"ROLE_ADMIN"));
			userService.saveUser(new AppUser(null,"default","password",new ArrayList<>()));
			userService.saveUser(new AppUser(null,"defaultadmin","password-admin",new ArrayList<>()));
			userService.addRoleToUser("default","ROLE_USER");
			userService.addRoleToUser("defaultadmin","ROLE_ADMIN");
		};
	}*/
}
