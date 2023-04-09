package com.project.kc.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "Users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "username"
        }),
        @UniqueConstraint(columnNames = {
            "email"
        })
})
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(min=3, max = 50)
	private String username;
	
	@NotBlank
    @Size(min=3, max = 50)
    private String name;

	@NaturalId
    @NotBlank
    @Size(max = 50)
    @Email
	private String email;

	@NotBlank
    @Size(min=6, max = 100)
	private String password;
	
	private LocalDateTime createdAt;
	
	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean isActivated;
	
	private LocalDateTime activeStatusTime;
	
	private LocalDateTime recentActivityTime;
	
	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean isOrg;
	
	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean isConfirmedOrg;	

	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Users_Roles", 
    	joinColumns = @JoinColumn(name = "user_id"), 
    	inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

	public Users() {
	}

	public Users(@NotBlank @Size(min = 3, max = 50) String username,
			@NotBlank @Size(min = 3, max = 50) String name, @NotBlank @Size(max = 50) @Email String email,
			@NotBlank @Size(min = 6, max = 100) String password, LocalDateTime createdAt, Boolean isActivated,
			LocalDateTime activeStatusTime, LocalDateTime recentActivityTime, Boolean isOrg, Boolean isConfirmedOrg) {
		this.username = username;
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
		this.isActivated = isActivated;
		this.activeStatusTime = activeStatusTime;
		this.recentActivityTime = recentActivityTime;
		this.isOrg = isOrg;
		this.isConfirmedOrg = isConfirmedOrg;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Boolean getIsActivated() {
		return isActivated;
	}

	public void setIsActivated(Boolean isActivated) {
		this.isActivated = isActivated;
	}

	public LocalDateTime getActiveStatusTime() {
		return activeStatusTime;
	}

	public void setActiveStatusTime(LocalDateTime activeStatusTime) {
		this.activeStatusTime = activeStatusTime;
	}

	public LocalDateTime getRecentActivityTime() {
		return recentActivityTime;
	}

	public void setRecentActivityTime(LocalDateTime recentActivityTime) {
		this.recentActivityTime = recentActivityTime;
	}

	public Boolean getIsOrg() {
		return isOrg;
	}

	public void setIsOrg(Boolean isOrg) {
		this.isOrg = isOrg;
	}

	public Boolean getIsConfirmedOrg() {
		return isConfirmedOrg;
	}

	public void setIsConfirmedOrg(Boolean isConfirmedOrg) {
		this.isConfirmedOrg = isConfirmedOrg;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
