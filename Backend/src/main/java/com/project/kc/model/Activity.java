package com.project.kc.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Activity")
public class Activity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Name is not blank")
    @Size(min=3, message = "Name is over than 2 characters")
	private String name;
	
	@NotBlank(message = "Description is not blank")
    @Size(min=10, message = "Description is over than 10 characters")
	private String desc;
	
	@NotBlank(message = "Address is not blank")
	private String address;
	
	@NotBlank(message = "Phone is not blank")
	private String phone;
	
	@Email(message = "Please check your email")
	private String email;
	
	private String cover_url;
	
	@NotBlank(message = "Contact name is not blank")
	private String contactName;
	
	@Min(value = 2, message = "Member number is over than 1")
	private Integer memberNumber;
	
	private LocalTime sTime;
	
	private LocalDate sDate;
	
	private LocalTime eTime;
	
	private LocalDate eDate;
	
	private LocalDateTime createAt;
	
	private Long adminId;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 60)
	private ActivityStatus status;
	
	public Activity() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public Integer getMemberNumber() {
		return memberNumber;
	}

	public void setMemberNumber(Integer memberNumber) {
		this.memberNumber = memberNumber;
	}

	public LocalTime getsTime() {
		return sTime;
	}

	public void setsTime(LocalTime sTime) {
		this.sTime = sTime;
	}

	public LocalTime geteTime() {
		return eTime;
	}

	public void seteTime(LocalTime eTime) {
		this.eTime = eTime;
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	public LocalDate getsDate() {
		return sDate;
	}

	public void setsDate(LocalDate sDate) {
		this.sDate = sDate;
	}

	public LocalDate geteDate() {
		return eDate;
	}

	public void seteDate(LocalDate eDate) {
		this.eDate = eDate;
	}

	public String getCover_url() {
		return cover_url;
	}

	public void setCover_url(String cover_url) {
		this.cover_url = cover_url;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public ActivityStatus getStatus() {
		return status;
	}

	public void setStatus(ActivityStatus status) {
		this.status = status;
	}
}
