package com.project.kc.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

public class SignupRequest {
    @NotBlank(message = "Username is not blank")
    @Size(min = 3, max = 50, message = "Username size must be between 3 and 50")
    private String username;
    
    @NotBlank(message = "Name is not blank")
    @Size(min = 3, max = 50, message = "Name size must be between 3 and 50") 
    String name;
 
    @NotBlank(message = "Email is not blank")
    @Size(max = 100)
    @Email
    private String email;
    
    private Boolean isOrg;
    
    private Set<String> roles;
    
    @NotBlank(message = "Password is not blank")
    @Size(min = 6, max = 100, message = "Password size must be between 6 and 100")
    private String password;
  
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRoles() {
      return this.roles;
    }
    
    public void setRole(Set<String> roles) {
      this.roles = roles;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsOrg() {
		return isOrg;
	}

	public void setIsOrg(Boolean isOrg) {
		this.isOrg = isOrg;
	}
    
}
