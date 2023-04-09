package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;

public class PostRequest {
	
	@NotBlank(message = "Content is not empty")
	private String content;
	
	private String image;
	
	private Long user_id;
	
	private Long activity_id;
	
	public PostRequest() {
		// TODO Auto-generated constructor stub
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getActivity_id() {
		return activity_id;
	}

	public void setActivity_id(Long activity_id) {
		this.activity_id = activity_id;
	}
}
