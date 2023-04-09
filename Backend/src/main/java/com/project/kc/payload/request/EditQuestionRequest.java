package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;

public class EditQuestionRequest {
	private Long question_id;
	
	@NotBlank(message = "Content is not empty")
	private String content;
	
	public EditQuestionRequest() {
		// TODO Auto-generated constructor stub
	}

	public Long getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(Long question_id) {
		this.question_id = question_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public EditQuestionRequest(Long question_id, @NotBlank(message = "Content is not empty") String content) {
		super();
		this.question_id = question_id;
		this.content = content;
	}
}
