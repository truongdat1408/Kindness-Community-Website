package com.project.kc.payload.request;

public class CoverRequest {
	private Long activity_id;
	
	private String cover;
	
	public CoverRequest() {
		// TODO Auto-generated constructor stub
	}

	public CoverRequest(Long activity_id, String cover) {
		super();
		this.activity_id = activity_id;
		this.cover = cover;
	}

	public Long getActivity_id() {
		return activity_id;
	}

	public void setActivity_id(Long activity_id) {
		this.activity_id = activity_id;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}
	
}
