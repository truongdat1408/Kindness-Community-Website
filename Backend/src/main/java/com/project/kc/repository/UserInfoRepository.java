package com.project.kc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.kc.model.UserInfo;
import com.project.kc.model.Users;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long>{
	List<UserInfo> findByUser(Users user);
	
	@Query(value= "SELECT * FROM user_info WHERE id IN (SELECT user_id FROM user_activity WHERE activity_id = ? AND role != 'WAIT')", nativeQuery = true)
	List<UserInfo> getMembersByActivityId(Long activityId);
	
	@Query(value= "SELECT * FROM user_info WHERE id IN (SELECT user_id FROM user_activity WHERE activity_id = ? AND role = 'WAIT')", nativeQuery = true)
	List<UserInfo> getWaitMembersByActivityId(Long activityId);
}
