package com.project.kc.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.kc.model.Activity;
import com.project.kc.model.Answer;
import com.project.kc.model.Question;
import com.project.kc.model.UserInfo;
import com.project.kc.payload.request.AnswerRequest;
import com.project.kc.payload.request.EditAnswerRequest;
import com.project.kc.payload.request.EditQuestionRequest;
import com.project.kc.payload.request.QuestionRequest;
import com.project.kc.repository.ActivityRepository;
import com.project.kc.repository.AnswerRepository;
import com.project.kc.repository.QuestionRepository;
import com.project.kc.repository.UserInfoRepository;

@Service
public class QAService {
	@Autowired
	private QuestionRepository questionRepo;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private AnswerRepository answerRepository;
	
	@Transactional
	public Question createQuestion(QuestionRequest postReq) {
		UserInfo userInfo = userInfoRepository.findById(postReq.getUser_id()).get();
		Activity activity = activityRepository.findById(postReq.getActivity_id()).get();
		
		Question question = new Question(postReq.getContent(), LocalDateTime.now(), LocalDateTime.now(), activity, userInfo);
		return questionRepo.save(question);
	}

	public List<Question> getAllQuestionsByActivityId(Long id) {
		return questionRepo.findByActivityId(id);
	}
	
	@Transactional
	public Answer createAnswer(AnswerRequest answerRequest){
		UserInfo user = userInfoRepository.findById(answerRequest.getUser_id()).get();
		Question question = questionRepo.findById(answerRequest.getQuestion_id()).get();
		Answer answer = new Answer(answerRequest.getContent(), LocalDateTime.now(), LocalDateTime.now(), user, question);
		return answerRepository.save(answer);
	}
	
	public List<Answer> getAllAnswersByActivityId(Long id) {
		return answerRepository.getAllAnswersByActivityId(id);
	}

	@Transactional
	public void deleteAnswer(Long answer_id) {
		answerRepository.deleteById(answer_id);
	}
	
	@Transactional
	public Answer editAnswer(EditAnswerRequest answerReq) {
		Answer ans = answerRepository.findById(answerReq.getAnswer_id()).get();
		ans.setContent(answerReq.getContent());
		ans.setUpdatedAt(LocalDateTime.now());
		return answerRepository.save(ans);
	}
	
	@Transactional
	public void deleteQuestion(Long question_id) {
		answerRepository.deleteAllByQuestionId(question_id);
		questionRepo.deleteById(question_id);
	}

	public Question editQuestion(@Valid EditQuestionRequest questionRequest) {
		Question question = questionRepo.findById(questionRequest.getQuestion_id()).get();
		question.setContent(questionRequest.getContent());
		question.setUpdatedAt(LocalDateTime.now());
		return questionRepo.save(question);
	}
}
