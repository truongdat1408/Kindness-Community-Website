package com.project.kc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.kc.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	@Query(value = "SELECT * FROM POST p WHERE p.activity_id = ?1 ORDER BY updated_at DESC", nativeQuery = true)
	List<Post> findByActivityId(Long id);
}
