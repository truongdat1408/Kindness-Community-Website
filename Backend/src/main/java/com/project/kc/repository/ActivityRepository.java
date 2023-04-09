package com.project.kc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.kc.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long>{

}
