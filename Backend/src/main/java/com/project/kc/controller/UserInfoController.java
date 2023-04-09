package com.project.kc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.kc.model.dto.UserInfoDto;
import com.project.kc.service.UserInfoServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserInfoController {
	
	@Autowired
	private UserInfoServiceImpl userInfoService;
	
	@GetMapping("/user-info")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public UserInfoDto getUser(@RequestParam long id){
		return userInfoService.getUserInfoDto(id);
	}
	
	@PostMapping("/user-info")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<UserInfoDto> update(@Valid @RequestBody UserInfoDto userInfoDto){
		System.out.println(userInfoDto.getCover_url());
		userInfoService.saveUserInfoDto(userInfoDto);
		return new ResponseEntity<>(userInfoService.saveUserInfoDto(userInfoDto), HttpStatus.OK); 
	}
	
	@PostMapping("/user-info/avatar")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> updateAvatar(@RequestParam long id, @RequestParam String avatar){
		return new ResponseEntity<>(userInfoService.saveUserInfoDto(userInfoService.updateAvatar(id, avatar)), HttpStatus.OK); 
	}
	
	@PostMapping("/user-info/cover")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<UserInfoDto> updateCover(@RequestParam long id, @RequestParam String cover){
		return new ResponseEntity<>(userInfoService.saveUserInfoDto(userInfoService.updateCover(id, cover)), HttpStatus.OK); 
	}
	
	@GetMapping("/get-user-info-by-username/{username}")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> getUserInfoByUserName(@PathVariable("username") String username){
		return new ResponseEntity<>(userInfoService.getUserInfoDtoByUsername(username), HttpStatus.OK);
	}
}
