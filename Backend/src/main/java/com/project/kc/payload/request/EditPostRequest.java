package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;

public class EditPostRequest {
	@NotBlank(message = "Content is not empty")
	private String content;
	
	private Long post_id;
	
	private String image;

	public EditPostRequest(@NotBlank(message = "Content is not empty") String content, Long post_id, String image) {
		this.content = content;
		this.post_id = post_id;
		this.image = image;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getPost_id() {
		return post_id;
	}

	public void setPost_id(Long post_id) {
		this.post_id = post_id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
}
