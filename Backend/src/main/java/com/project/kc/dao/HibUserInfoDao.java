package com.project.kc.dao;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.hibernate.type.DoubleType;
import org.hibernate.type.IntegerType;
import org.hibernate.type.LongType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.kc.model.UserInfo;
import com.project.kc.model.Users;
import com.project.kc.model.dto.UserInfoDto;
import com.project.kc.repository.UserInfoRepository;
import com.project.kc.repository.UserRepository;

@Repository
public class HibUserInfoDao implements UserInfoDao{
	private final String Q_GET_USER_INFO_DTO = "SELECT u.id, u.email, u.name, u.username, ui.address, ui.avatar_url, ui.phone, ui.activity_points acp, ui.reputation_points rep, ui.about, ui.cover_url\n"
			+ "FROM user_info ui\n"
			+ "JOIN users u\n"
			+ "ON ui.users_id = u.id\n"
			+ "WHERE u.id = :id";
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private UserInfoRepository userInfoRepo;
	
	@Autowired
	private UserRepository userRepo;

	@SuppressWarnings("deprecation")
	@Override
	public UserInfoDto getUserInfoDto(long id) {
		Session session = entityManager.unwrap(Session.class);
		return (UserInfoDto) session.createNativeQuery(Q_GET_USER_INFO_DTO)
				.setParameter("id", id)
				.addScalar("id", LongType.INSTANCE)
				.addScalar("email", StringType.INSTANCE)
				.addScalar("name", StringType.INSTANCE)
				.addScalar("username", StringType.INSTANCE)
				.addScalar("address", StringType.INSTANCE)
				.addScalar("avatar_url", StringType.INSTANCE)
				.addScalar("phone", StringType.INSTANCE)
				.addScalar("acp", IntegerType.INSTANCE)
				.addScalar("rep", DoubleType.INSTANCE)
				.addScalar("about", StringType.INSTANCE)
				.addScalar("cover_url", StringType.INSTANCE)
				.setResultTransformer(Transformers.aliasToBean(UserInfoDto.class))
				.getSingleResult();
	}

	@Override
	public UserInfoDto saveUserInfoDto(UserInfoDto userInfoDto) {
		Users user = userRepo.getById(userInfoDto.getId());
		UserInfo userInfo = userInfoRepo.findByUser(user).get(0);
		
		//update user
		user.setUsername(userInfoDto.getUsername());
		user.setName(userInfoDto.getName());
		user.setEmail(userInfoDto.getEmail());
		userRepo.save(user);
		
		//update user info
		
		userInfo.setAddress(userInfoDto.getAddress());
		userInfo.setPhone(userInfoDto.getPhone());
		userInfo.setAbout(userInfoDto.getAbout());
		userInfo.setAvatarUrl(userInfoDto.getAvatar_url());
		userInfo.setCoverUrl(userInfoDto.getCover_url());
		
		userInfoRepo.save(userInfo);
		return userInfoDto;
	}

}
