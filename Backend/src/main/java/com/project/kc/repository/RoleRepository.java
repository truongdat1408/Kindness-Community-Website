package com.project.kc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.kc.model.ERole;
import com.project.kc.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
