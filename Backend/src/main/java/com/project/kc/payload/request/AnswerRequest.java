package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;

public class AnswerRequest {
	private Long question_id;

	private Long user_id;
	
	@NotBlank(message = "Content is not empty")
	private String content;
	
	public AnswerRequest() {
		// TODO Auto-generated constructor stub
	}

	public AnswerRequest(Long question_id, Long user_id, @NotBlank(message = "Content is not empty")String content) {
		super();
		this.question_id = question_id;
		this.user_id = user_id;
		this.content = content;
	}

	public Long getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(Long question_id) {
		this.question_id = question_id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}	
