package com.project.kc.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "User_Activity")
public class UserActivity {
	@EmbeddedId
	private Id id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
	private Users user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "activity_id", referencedColumnName = "id", insertable = false, updatable = false)
	private Activity activity;

	@Enumerated(EnumType.STRING)
	@Column(length = 60)
	private EActivityRole role;

	public UserActivity() {
		
	}

	// Nested class
	@Embeddable
	public static class Id implements Serializable {

		private static final long serialVersionUID = 1L;

		@Column(name = "user_id")
		private Long userId;

		@Column(name = "activity_id")
		private Long activityId;

		public Id() {
		}

		public Id(Long userId, Long activityId) {
			super();
			this.userId = userId;
			this.activityId = activityId;
		}


		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public Long getActivityId() {
			return activityId;
		}

		public void setActivityId(Long activityId) {
			this.activityId = activityId;
		}
	}

	public UserActivity(Users user, Activity activity, EActivityRole role) {
		this.user = user;
		this.activity = activity;
		this.role = role;
	}

	public Id getId() {
		return id;
	}

	public void setId(Id id) {
		this.id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Activity getActivity() {
		return activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public EActivityRole getRole() {
		return role;
	}

	public void setRole(EActivityRole role) {
		this.role = role;
	}

}
