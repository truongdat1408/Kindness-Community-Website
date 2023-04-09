package com.project.kc.payload.request;

public class JoinRequest {
	private Long activity_id;
	
	private Long user_id;
	
	public JoinRequest() {
		// TODO Auto-generated constructor stub
	}
	

	public JoinRequest(Long activity_id, Long user_id) {
		super();
		this.activity_id = activity_id;
		this.user_id = user_id;
	}


	public Long getActivity_id() {
		return activity_id;
	}

	public void setActivity_id(Long activity_id) {
		this.activity_id = activity_id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	
}
