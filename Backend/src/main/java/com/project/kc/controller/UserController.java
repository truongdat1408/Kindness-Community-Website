package com.project.kc.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.kc.model.ERole;
import com.project.kc.model.Role;
import com.project.kc.model.Users;
import com.project.kc.payload.request.SignupRequest;
import com.project.kc.payload.response.MessageResponse;
import com.project.kc.repository.RoleRepository;
import com.project.kc.repository.UserRepository;
import com.project.kc.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	RoleRepository roleRepository;
	
	@GetMapping("/users")
	@PreAuthorize("hasRole('MOD') or hasRole('ADMIN')")
	public List<Users> getUser(){
		return userService.getUser();
	}
	
	@PostMapping("/users/create")
	@PreAuthorize("hasRole('MOD') or hasRole('ADMIN')")
	public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}
		
		// Create new user's account
		Users user = new Users(
				signUpRequest.getUsername(),
				signUpRequest.getName(), 
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), 
				LocalDateTime.now(), 
				true, 
				LocalDateTime.now(), 
				LocalDateTime.now(), 
				false, 
				false);

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "user":
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
					break;
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MOD)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);
					break;
				case "org":
					Role orgRole = roleRepository.findByName(ERole.ROLE_ORG)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(orgRole);
					user.setIsOrg(true);
					break;
				default:
					throw new RuntimeException("Error: Role is not found.");
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User created successfully!"));
	}
}
