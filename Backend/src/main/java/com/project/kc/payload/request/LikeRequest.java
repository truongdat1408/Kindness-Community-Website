package com.project.kc.payload.request;

public class LikeRequest {
	private Long id;
	
	private Long user_id;

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

	public LikeRequest(Long id, Long user_id) {
		this.id = id;
		this.user_id = user_id;
	}
}
