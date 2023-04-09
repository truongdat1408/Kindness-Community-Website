package com.project.kc.model.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserInfoDto {
	private Long id; //id of user
	
	@NotBlank(message = "Email is not blank")
    @Size(max = 100)
    @Email
	private String email;
	
	@NotBlank(message = "Name is not blank")
    @Size(min = 3, max = 50, message = "Name size must be between 3 and 50")
	private String name;
	
	@NotBlank(message = "Username is not blank")
    @Size(min = 3, max = 50, message = "Username size must be between 3 and 50")
	private String username;
	
	private String address;
	
	private String avatar_url;
	
	private String cover_url;
	
	private String phone;
	
	private Integer acp;
	
	private Double rep;
	
	private String about;
	
	public UserInfoDto() {
		
	}
	
	public UserInfoDto(Long id, String email, String name, String username, String address, String avatar_url,
			String phone, Integer acp, Double rep, String about, String cover_url) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.username = username;
		this.address = address;
		this.avatar_url = avatar_url;
		this.phone = phone;
		this.acp = acp;
		this.rep = rep;
		this.about = about;
		this.cover_url = cover_url;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAvatar_url() {
		return avatar_url;
	}
	public void setAvatar_url(String avatar_url) {
		this.avatar_url = avatar_url;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Integer getAcp() {
		return acp;
	}
	public void setAcp(Integer acp) {
		this.acp = acp;
	}
	public Double getRep() {
		return rep;
	}
	public void setRep(Double rep) {
		this.rep = rep;
	}

	public String getCover_url() {
		return cover_url;
	}

	public void setCover_url(String cover_url) {
		this.cover_url = cover_url;
	}
	
}
