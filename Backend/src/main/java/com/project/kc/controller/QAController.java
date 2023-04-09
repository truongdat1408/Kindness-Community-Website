package com.project.kc.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.kc.model.Answer;
import com.project.kc.model.Question;
import com.project.kc.payload.request.AnswerRequest;
import com.project.kc.payload.request.EditAnswerRequest;
import com.project.kc.payload.request.EditQuestionRequest;
import com.project.kc.payload.request.QuestionRequest;
import com.project.kc.service.QAService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/qa")
public class QAController {
	@Autowired
	private QAService qAService;
	
	@PostMapping("/create-question")
	public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionRequest questionRequest){
		Question question = qAService.createQuestion(questionRequest);
		return new ResponseEntity<>(question, HttpStatus.OK);
	}
	
	@GetMapping("/all-question/{id}")
	public ResponseEntity<?> getAllQuestionsByActivityId(@PathVariable("id") Long id){
		List<Question> questions = qAService.getAllQuestionsByActivityId(id);
		return new ResponseEntity<>(questions, HttpStatus.OK);
	}
	
	@PostMapping("/delete-question/{id}")
	public ResponseEntity<?> deleteQuestion(@PathVariable("id") Long question_id){
		qAService.deleteQuestion(question_id);
		return new ResponseEntity<>("Delete Done!", HttpStatus.OK);
	}
	
	@PostMapping("/edit-question")
	public ResponseEntity<?> editQuestion(@Valid @RequestBody EditQuestionRequest questionRequest){
		Question question = qAService.editQuestion(questionRequest);
		return new ResponseEntity<>(qAService.getAllQuestionsByActivityId(question.getActivity().getId()), HttpStatus.OK);
	}
	
	@PostMapping("/create-answer")
	public ResponseEntity<?> createAnswer(@Valid @RequestBody AnswerRequest answerRequest){
		Answer answer = qAService.createAnswer(answerRequest);
		return new ResponseEntity<>(answer, HttpStatus.OK);
	}
	
	@GetMapping("/all-answer/{id}")
	public ResponseEntity<?> getAllAnswersByActivityId(@PathVariable("id") Long activity_id){
		List<Answer> answers = qAService.getAllAnswersByActivityId(activity_id);
		return new ResponseEntity<>(answers, HttpStatus.OK);
	}
	
	@PostMapping("/delete-answer/{id}")
	public ResponseEntity<?> deleteAnswer(@PathVariable("id") Long answer_id){
		qAService.deleteAnswer(answer_id);
		return new ResponseEntity<>("Delete Done!", HttpStatus.OK);
	}
	
	@PostMapping("/edit-answer")
	public ResponseEntity<?> editAnswer(@Valid @RequestBody EditAnswerRequest answerRequest){
		Answer ans = qAService.editAnswer(answerRequest);
		return new ResponseEntity<>(qAService.getAllAnswersByActivityId(ans.getQuestion().getActivity().getId()), HttpStatus.OK);
	}
}
