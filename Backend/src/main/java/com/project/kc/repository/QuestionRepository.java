package com.project.kc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.kc.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	@Query(value = "SELECT * FROM QUESTION q WHERE q.activity_id = ?1 ORDER BY updated_at DESC", nativeQuery = true)
	List<Question> findByActivityId(Long id);
}
