/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
package net.pracxs.angularjs.model.repos;

import java.util.List;

import net.pracxs.angularjs.model.entities.MenuCategory;
import net.pracxs.angularjs.model.entities.MenuItem;

import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * This interface defines storage operation that may be performed with the MenuItem entity 
 */
@Repository
@Lazy
public interface MenuItemRepository extends JpaRepository<MenuItem, Long>
{
	@Query("SELECT c FROM MenuCategory c WHERE EXISTS( SELECT i FROM c.items i ) ORDER BY c.order")
	List<MenuCategory> getMenu();
}
