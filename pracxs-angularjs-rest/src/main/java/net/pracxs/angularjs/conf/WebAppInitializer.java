/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
package net.pracxs.angularjs.conf;

import net.pracxs.angularjs.ProjectRootScanMarker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * This class initializes the servlet as a Spring boot application.
 * 
 * This is supported by Servlet API 3.0+
 */
@SpringBootApplication
@ComponentScan(basePackageClasses=ProjectRootScanMarker.class)
public class WebAppInitializer extends SpringBootServletInitializer
{
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WebAppInitializer.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(WebAppInitializer.class, args);
    }
}
