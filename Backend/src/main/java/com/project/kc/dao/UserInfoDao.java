package com.project.kc.dao;

import com.project.kc.model.dto.UserInfoDto;

public interface UserInfoDao {
	UserInfoDto getUserInfoDto(long id);
	UserInfoDto saveUserInfoDto(UserInfoDto userInfoDao);
	//UserInfo getUserInfoByUserId(long users_id);
}
