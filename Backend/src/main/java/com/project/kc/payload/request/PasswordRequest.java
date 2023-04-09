package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class PasswordRequest {
	
	private Long id;
	
	@NotBlank(message = "Password is not blank")
	@Size(min = 6, max = 50, message = "Password size must be between 6 and 50") 
	private String currentPassword;
	
	@NotBlank(message = "Password is not blank")
	@Size(min = 6, max = 50, message = "Password size must be between 6 and 50") 
	private String newPassword;

	public PasswordRequest() {
		
	}
	
	public PasswordRequest(Long id,
			@NotBlank(message = "Password is not blank") @Size(min = 6, max = 50, message = "Password size must be between 6 and 50") String currentPassword,
			@NotBlank(message = "Password is not blank") @Size(min = 6, max = 50, message = "Password size must be between 6 and 50") String newPassword) {
		this.id = id;
		this.currentPassword = currentPassword;
		this.newPassword = newPassword;
	}

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}
