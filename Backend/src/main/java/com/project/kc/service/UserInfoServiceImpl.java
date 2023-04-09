package com.project.kc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.kc.dao.UserInfoDao;
import com.project.kc.model.UserInfo;
import com.project.kc.model.Users;
import com.project.kc.model.dto.UserInfoDto;
import com.project.kc.repository.UserInfoRepository;
import com.project.kc.repository.UserRepository;

@Service
public class UserInfoServiceImpl {
	
	@Autowired
	private UserInfoRepository userInfoRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private UserInfoDao userInfoDao;
	
	public UserInfoDto getUserInfoDto(long id) {
		return userInfoDao.getUserInfoDto(id);
	}
	
	public UserInfoDto saveUserInfoDto(UserInfoDto userInfoDto) {
		return userInfoDao.saveUserInfoDto(userInfoDto);
	}
	
	public UserInfoDto updateAvatar(long id, String avatar) {
		UserInfo userInfoToUpdate = userInfoRepo.getById(id);
		userInfoToUpdate.setAvatarUrl(avatar);
		userInfoRepo.save(userInfoToUpdate);
		return getUserInfoDto(id);
	}
	
	public UserInfoDto updateCover(long id, String cover) {
		UserInfo userInfoToUpdate = userInfoRepo.getById(id);
		userInfoToUpdate.setCoverUrl(cover);
		userInfoRepo.save(userInfoToUpdate);
		return getUserInfoDto(id);
	}

	public UserInfoDto getUserInfoDtoByUsername(String username) {
		Users user = userRepo.findByUsername(username).get();
		return userInfoDao.getUserInfoDto(user.getId());
	}
}
