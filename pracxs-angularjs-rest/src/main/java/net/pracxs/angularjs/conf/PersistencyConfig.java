/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
package net.pracxs.angularjs.conf;

import net.pracxs.angularjs.model.entities.MenuItem;
import net.pracxs.angularjs.model.repos.MenuItemRepository;

import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * This class configures Spring's JPA persistence
 */
@Configuration
@EnableJpaRepositories(basePackageClasses=MenuItemRepository.class)
@EnableTransactionManagement
@EntityScan(basePackageClasses=MenuItem.class)
public class PersistencyConfig
{}
