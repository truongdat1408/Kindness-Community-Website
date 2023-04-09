package com.project.kc.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "UserInfo")

public class UserInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String address;
	
	private String phone;
	
	private String avatarUrl;
	
	private String coverUrl;
	
	private Double reputationPoints;
	
	private Integer activityPoints;
	
	private String about;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "users_id", referencedColumnName = "id")
	private Users user;
	
	public UserInfo() {
	}

	public UserInfo(Long id, String address, String phone, String avatarUrl, String about, Users user, String coverUrl) {
		this.id = id;
		this.address = address;
		this.phone = phone;
		this.avatarUrl = avatarUrl;
		this.about = about;
		this.user = user;
		this.coverUrl = coverUrl;
	}
	
	public UserInfo(String address, String phone, String avatarUrl, String about, Users user) {
		this.address = address;
		this.phone = phone;
		this.avatarUrl = avatarUrl;
		this.about = about;
		this.user = user;
	}
	
	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public Double getReputationPoints() {
		return reputationPoints;
	}

	public void setReputationPoints(Double reputationPoints) {
		this.reputationPoints = reputationPoints;
	}

	public Integer getActivityPoints() {
		return activityPoints;
	}

	public void setActivityPoints(Integer activityPoints) {
		this.activityPoints = activityPoints;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getCoverUrl() {
		return coverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}
	
	
}
