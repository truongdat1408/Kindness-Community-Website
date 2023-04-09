package com.project.kc.payload.request;

public class CommentRequest {
	private Long id;

	private Long user_id;
	
	private Long parent_id;
	
	private String content;

	public CommentRequest(Long id, Long user_id, Long parent_id, String content) {
		this.id = id;
		this.user_id = user_id;
		this.parent_id = parent_id;
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getParent_id() {
		return parent_id;
	}

	public void setParent_id(Long parent_id) {
		this.parent_id = parent_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
