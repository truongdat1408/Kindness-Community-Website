package com.project.kc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.kc.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	@Query(value = "SELECT * FROM Comment WHERE parent_id IS NULL AND post_id = ?1", nativeQuery = true)
	List<Comment> findAllRootCommentsByPostId(Long post_id);
	
	@Query(value = "SELECT * FROM Comment WHERE parent_id = ?1 AND post_id = ?2", nativeQuery = true)
	List<Comment> findAllComments(Long parent_id, Long post_id);
	
	@Query(value = "SELECT * FROM Comment WHERE parent_id IS NULL", nativeQuery = true)
	List<Comment> getAllRootComments();
	
	@Query(value = "SELECT * FROM Comment WHERE parent_id IS NOT NULL", nativeQuery = true)
	List<Comment> getAllReplies();
	
	@Modifying
	@Query(value = "DELETE FROM Comment c WHERE c.parent_id = :idCom OR c.id = :idCom", nativeQuery = true)
	void deleteCommentByIdCom(@Param("idCom") Long id);
	
	@Modifying
	@Query(value = "DELETE FROM Comment c WHERE c.parent_id = :id", nativeQuery = true)
	void deleteByParentId(@Param("id") Long id);
	
	@Modifying
	@Query(value = "DELETE FROM Comment c WHERE c.post_id = :id", nativeQuery = true)
	void deleteCommentByPostId(@Param("id") Long id);
}
