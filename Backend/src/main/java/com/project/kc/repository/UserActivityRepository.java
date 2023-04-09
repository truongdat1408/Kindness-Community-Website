package com.project.kc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.kc.model.UserActivity;

public interface UserActivityRepository extends JpaRepository<UserActivity, UserActivity.Id>{
	
}
