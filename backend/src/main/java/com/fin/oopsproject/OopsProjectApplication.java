package com.fin.oopsproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//In Spring Boot, the class running the application is annotated with @SpringBootApplication,

@SpringBootApplication
public class OopsProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(OopsProjectApplication.class, args);
			//to run the springboot application
	}

}
/*
 * Annotations are special markers in your code that give instructions to the Spring framework. These instructions tell Spring how to manage and configure your beans.
 * 
 Beans: Objects that Spring manages.
Annotations: Markers that tell Spring how to manage those objects.

@Configuration: Marks the class as a source of bean definitions for the application context. It allows you to define beans using @Bean methods.

@EnableAutoConfiguration: Enables Spring Boot’s auto-configuration feature, which automatically configures your application based on the dependencies in the classpath. It simplifies setup by guessing and configuring necessary beans.


@ComponentScan: Tells Spring where to look for components, configurations, and services. By default, it scans the package where the application class is located and its sub-packages.


@SpringBootApplication - This annotation combines @Configuration, @EnableAutoConfiguration, and @ComponentScan. It tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings.
It is essentially to tell spring "correct configuration set up kar"
 */
