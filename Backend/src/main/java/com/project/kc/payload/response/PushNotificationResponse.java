package com.project.kc.payload.response;

public class PushNotificationResponse {
	private int status;
	private String message;
	
	public PushNotificationResponse() {
		// TODO Auto-generated constructor stub
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public PushNotificationResponse(int status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
	
}
