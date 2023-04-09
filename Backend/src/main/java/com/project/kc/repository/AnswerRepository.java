package com.project.kc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.kc.model.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long>{
	@Query(value = "SELECT * FROM Answer WHERE question_id IN (SELECT id FROM Question WHERE activity_id = ?1) ORDER BY updated_at DESC", nativeQuery = true)
	List<Answer> getAllAnswersByActivityId(Long activity_id);
	
	@Modifying
	@Query(value = "DELETE FROM Answer WHERE question_id = :question_id", nativeQuery = true)
	void deleteAllByQuestionId(@Param("question_id") Long question_id);
}
