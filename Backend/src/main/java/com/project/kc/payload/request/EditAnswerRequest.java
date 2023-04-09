package com.project.kc.payload.request;

import javax.validation.constraints.NotBlank;

public class EditAnswerRequest {
	private Long answer_id;
	
	@NotBlank(message = "Content is not empty")
	private String content;
	
	public EditAnswerRequest() {
		// TODO Auto-generated constructor stub
	}

	public EditAnswerRequest(Long answer_id, @NotBlank(message = "Content is not empty") String content) {
		super();
		this.answer_id = answer_id;
		this.content = content;
	}

	public Long getAnswer_id() {
		return answer_id;
	}

	public void setAnswer_id(Long answer_id) {
		this.answer_id = answer_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
