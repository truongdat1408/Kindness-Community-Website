package com.project.kc.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ValidationHandler extends ResponseEntityExceptionHandler{
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		
		Map<String, String> errors = new HashMap<>();
		ObjectError firstError = ex.getBindingResult().getAllErrors().get(0);
		
		String message = firstError.getDefaultMessage();
		errors.put("message", message);
//		ex.getBindingResult().getAllErrors().forEach((error) ->{
//			
//			String fieldName = ((FieldError) error).getField();
//			String message = fieldName + " " + error.getDefaultMessage();
//			errors.put("message", message);
//		});
		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
	}

}