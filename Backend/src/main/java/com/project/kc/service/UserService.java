package com.project.kc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.kc.model.Users;
import com.project.kc.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public List<Users> getUser(){
		return userRepository.findAll();
	}
}
