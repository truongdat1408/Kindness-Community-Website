package com.project.kc.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.kc.model.Activity;
import com.project.kc.model.ActivityStatus;
import com.project.kc.payload.request.ActivityRequest;
import com.project.kc.payload.request.CoverRequest;
import com.project.kc.payload.request.JoinRequest;
import com.project.kc.service.ActivitySerivce;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/activity")
public class ActivityController {
	@Autowired
	private ActivitySerivce actvityService;
	
	@PostMapping("/create")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> createActivity(@Valid @RequestBody Activity activity){
		activity.setCreateAt(LocalDateTime.now());
		activity.setStatus(ActivityStatus.ACTIVATE);
		return new ResponseEntity<>(actvityService.create(activity), HttpStatus.OK);
	}
	
	@GetMapping("/all")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> getAll(){
		List<Activity> acts = actvityService.getAll();
		return new ResponseEntity<>(acts, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> getOne(@PathVariable("id") Long id){
		return ResponseEntity.ok(actvityService.getOne(id));
	}
	
	@GetMapping("/members/{id}")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> getMembers(@PathVariable("id") Long id){
		return ResponseEntity.ok(actvityService.getMembersInActivity(id));
	}
	
	@GetMapping("/wait-members/{id}")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> getWaitMembers(@PathVariable("id") Long id){
		return ResponseEntity.ok(actvityService.getWaitMembersInActivity(id));
	}
	
	@PostMapping("/join")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> join(@Valid @RequestBody JoinRequest joinReq){
		return ResponseEntity.ok(actvityService.join(joinReq));
	}
	
	@PostMapping("/join-wait")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> joinWait(@Valid @RequestBody JoinRequest joinReq){
		return ResponseEntity.ok(actvityService.joinWait(joinReq));
	}
	
	@PostMapping("/accept-join")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> acceptJoin(@Valid @RequestBody JoinRequest joinReq){
		return new ResponseEntity<>(actvityService.acceptJoin(joinReq), HttpStatus.OK);
	}
	
	@PostMapping("/unjoin")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> unjoin(@Valid @RequestBody JoinRequest joinReq){
		return ResponseEntity.ok(actvityService.unjoin(joinReq));
	}
	
	@PostMapping("/cover")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> editCover(@Valid @RequestBody CoverRequest coverReq){
		return ResponseEntity.ok(actvityService.updateCover(coverReq));
	}
	
	@PostMapping("/edit-activity")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> editActivity(@Valid @RequestBody ActivityRequest activityReq){
		return new ResponseEntity<>(actvityService.updateActivity(activityReq), HttpStatus.OK);
	}
}
