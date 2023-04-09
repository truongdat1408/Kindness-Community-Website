package com.project.kc.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Post")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Content is not empty")
	private String content;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
	
	private String image;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "activity_id", referencedColumnName = "id")
	@JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
	private Activity activity;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_info_id", referencedColumnName = "id")
	@JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
	private UserInfo userInfo;
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Post_Users", 
    	joinColumns = @JoinColumn(name = "post_id"), 
    	inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<Users> likes = new HashSet<>();
	
	@Enumerated(EnumType.STRING)
	@Column(length = 60)
	private PostStatus status;
	
	public Post() {
		
	}
	
	public Post(@NotBlank(message = "Content is not empty") String content, LocalDateTime createdAt,
			LocalDateTime updatedAt, String image, Activity activity, UserInfo userInfo, PostStatus status) {
		this.content = content;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.image = image;
		this.activity = activity;
		this.userInfo = userInfo;
		this.status = status;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Activity getActivity() {
		return activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public PostStatus getStatus() {
		return status;
	}

	public void setStatus(PostStatus status) {
		this.status = status;
	}

	public Set<Users> getLikes() {
		return likes;
	}

	public void setLikes(Set<Users> likes) {
		this.likes = likes;
	}
}
