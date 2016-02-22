/* Copyright (C) 2015 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
package net.pracxs.angularjs.model.repos;

import net.pracxs.angularjs.model.entities.User;

import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * This interface defines storage operation that may be performed with the User entity 
 */
@Repository
@Lazy
public interface UserRepository extends JpaRepository<User, Long>
{
	@Query("select u from User u where u.email = ?1 and u.password = ?2")
	User find(String email, String password);
}
