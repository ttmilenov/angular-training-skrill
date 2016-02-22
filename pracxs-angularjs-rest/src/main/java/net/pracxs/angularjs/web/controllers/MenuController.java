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
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;

import net.pracxs.angularjs.model.entities.MenuCategory;
import net.pracxs.angularjs.services.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * The controller/servlet of login 
 */
@RestController
@Lazy
@RequestMapping("/menu*")
public class MenuController
{
	private static final Logger log = Logger.getLogger(MenuController.class.getName());
	
	@Autowired
	public MenuService menuService;
	
	@RequestMapping(method = RequestMethod.GET, produces = "application/json")
	public List<MenuCategory> showAll()
			throws IOException, ServletException
	{
		log.log(Level.FINE, "Process request GET /menu-item/");
		
		return menuService.getMenu();
	}
}
