/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
package net.pracxs.angularjs.web.controllers;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;

import net.pracxs.angularjs.model.entities.User;
import net.pracxs.angularjs.model.repos.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * The controller/servlet of login 
 */
@Controller
@Lazy
@RequestMapping("/login")
public class LoginController
{
	private static final Logger log = Logger.getLogger(LoginController.class.getName());
	
	@Autowired(required=false)
	public UserRepository userRepo;
	
	/**
	 * Forms response for the <i>get</i> method
	 */
	@RequestMapping(method = RequestMethod.GET)
    @ResponseBody
	public String showLogin()
			throws IOException, ServletException
	{
		log.log(Level.FINE, "Process request GET /login");
		
		// return userRepo.toString();
		if( userRepo==null )
			return "No user repo";
		
		final User login = userRepo.find("ivan@pracxs.com", "Password@1");
			
		if( login==null )
			return "No user";
		
		return login.getFirstName() + " " + login.getLastName();
	}
}
