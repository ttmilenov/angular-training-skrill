/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
package net.pracxs.angularjs.services;

import java.util.List;

import net.pracxs.angularjs.model.entities.MenuCategory;
import net.pracxs.angularjs.model.repos.MenuItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Lazy
public class MenuService
{
	@Autowired
	private MenuItemRepository menuItemRepo;
	
	public List<MenuCategory> getMenu()
	{
		return menuItemRepo.getMenu();
	}
}
