package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginRequest {
	@NotBlank(message = "Username & Password is not blank")
	private String username;

	@NotBlank(message = "Username & Password is not blank")
	@Size(min = 6, max = 50, message = "Password size must be between 6 and 50") 
	private String password;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
