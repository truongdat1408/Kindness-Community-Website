package com.project.kc.payload.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RegisterRequest {
	
	@NotBlank(message = "Email is not blank")
    @Size(max = 100)
    @Email
	private String email;
	
	@NotBlank(message = "Name is not blank")
    @Size(min = 3, max = 50, message = "Name size must be between 3 and 50")
	private String name;
	
	@NotBlank(message = "Username is not blank")
    @Size(min = 3, max = 50, message = "Username size must be between 3 and 50")
	private String username;
	
	private String address;
	
	private String phone;
	
	@NotBlank(message = "Password is not blank")
    @Size(min = 6, max = 100, message = "Password size must be between 6 and 100")
	private String password;
	
	private Boolean isOrg;
    
    private Set<String> roles;
    
    public RegisterRequest() {
		// TODO Auto-generated constructor stub
	}

	public RegisterRequest(@NotBlank(message = "Email is not blank") @Size(max = 100) @Email String email,
			@NotBlank(message = "Name is not blank") @Size(min = 3, max = 50, message = "Name size must be between 3 and 50") String name,
			@NotBlank(message = "Username is not blank") @Size(min = 3, max = 50, message = "Username size must be between 3 and 50") String username,
			String address, String phone,
			@NotBlank(message = "Password is not blank") @Size(min = 6, max = 100, message = "Password size must be between 6 and 100") String password,
			Boolean isOrg, Set<String> roles) {
		super();
		this.email = email;
		this.name = name;
		this.username = username;
		this.address = address;
		this.phone = phone;
		this.password = password;
		this.isOrg = isOrg;
		this.roles = roles;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsOrg() {
		return isOrg;
	}

	public void setIsOrg(Boolean isOrg) {
		this.isOrg = isOrg;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
    
	
}
