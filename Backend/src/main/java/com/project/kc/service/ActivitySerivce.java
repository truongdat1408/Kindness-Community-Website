package com.project.kc.service;

import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.kc.model.Activity;
import com.project.kc.model.EActivityRole;
import com.project.kc.model.UserActivity;
import com.project.kc.model.UserInfo;
import com.project.kc.model.Users;
import com.project.kc.payload.request.ActivityRequest;
import com.project.kc.payload.request.CoverRequest;
import com.project.kc.payload.request.JoinRequest;
import com.project.kc.repository.ActivityRepository;
import com.project.kc.repository.UserActivityRepository;
import com.project.kc.repository.UserInfoRepository;
import com.project.kc.repository.UserRepository;

@Service
public class ActivitySerivce {
	
	@Autowired
	private ActivityRepository activityRepository;
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private UserActivityRepository uARepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Transactional
	public Activity create(Activity activity) {
		Activity savedActivity = activityRepository.save(activity);
		
		Users user = userRepo.getById(activity.getAdminId());
		UserActivity userActivity = new UserActivity();
		userActivity.setActivity(activity);
		userActivity.setUser(user);
		userActivity.setRole(EActivityRole.ADMIN);
		userActivity.setId(new UserActivity.Id(user.getId(), savedActivity.getId()));
		uARepo.save(userActivity);
		
		return savedActivity;
	}
	
	@Transactional
	public List<UserInfo> unjoin(JoinRequest joinReq) {
		uARepo.deleteById(new UserActivity.Id(joinReq.getUser_id(), joinReq.getActivity_id()));
		return userInfoRepository.getMembersByActivityId(joinReq.getActivity_id());
	}
	
	@Transactional
	public List<UserInfo> join(JoinRequest joinReq) {
		UserActivity userActivity = new UserActivity();
		Activity activity = activityRepository.findById(joinReq.getActivity_id()).get();
		Users user = userRepo.findById(joinReq.getUser_id()).get();
		
		userActivity.setActivity(activity);
		userActivity.setUser(user);
		userActivity.setRole(EActivityRole.MEMBER);
		userActivity.setId(new UserActivity.Id(user.getId(), activity.getId()));
		uARepo.save(userActivity);
		
		return userInfoRepository.getMembersByActivityId(activity.getId());
	}
	
	@Transactional
	public List<UserInfo> joinWait(JoinRequest joinReq) {
		UserActivity userActivity = new UserActivity();
		Activity activity = activityRepository.findById(joinReq.getActivity_id()).get();
		Users user = userRepo.findById(joinReq.getUser_id()).get();
		
		userActivity.setActivity(activity);
		userActivity.setUser(user);
		userActivity.setRole(EActivityRole.WAIT);
		userActivity.setId(new UserActivity.Id(user.getId(), activity.getId()));
		uARepo.save(userActivity);
		
		return userInfoRepository.getWaitMembersByActivityId(activity.getId());
	}
	
	public List<UserInfo> acceptJoin(JoinRequest joinReq){
		UserActivity userActivity = uARepo.findById(new UserActivity.Id(joinReq.getUser_id(),joinReq.getActivity_id())).get();
		userActivity.setRole(EActivityRole.MEMBER);
		uARepo.save(userActivity);
		return userInfoRepository.getMembersByActivityId(joinReq.getActivity_id());
	}
	
	public Activity save(Activity activity) {
		return activityRepository.save(activity);
	}
	
	public Activity updateCover(CoverRequest coverReq) {
		Activity activity = activityRepository.findById(coverReq.getActivity_id()).get();
		activity.setCover_url(coverReq.getCover());
		return activityRepository.save(activity);
	}
	
	public List<Activity> getAll(){
		return activityRepository.findAll();
	}
	
	public Activity getOne(Long id) {
		return activityRepository.findById(id).get();
	}
	
	public List<UserInfo> getMembersInActivity(Long id){
		return userInfoRepository.getMembersByActivityId(id);
	}
	
	public List<UserInfo> getWaitMembersInActivity(Long id){
		return userInfoRepository.getWaitMembersByActivityId(id);
	}

	public Activity updateActivity(@Valid ActivityRequest activityReq) {
		
		Activity activity = activityRepository.findById(activityReq.getId()).get();
		activity.setName(activityReq.getName());
		activity.setDesc(activityReq.getDesc());
		activity.setAddress(activity.getAddress());
		activity.setPhone(activityReq.getPhone());
		activity.setEmail(activityReq.getEmail());
		activity.setContactName(activityReq.getContactName());
		activity.setsTime(activityReq.getsTime());
		activity.setsDate(activityReq.getsDate());
		activity.seteTime(activityReq.geteTime());
		activity.seteDate(activityReq.geteDate());
		
		return activityRepository.save(activity);
	}
}
