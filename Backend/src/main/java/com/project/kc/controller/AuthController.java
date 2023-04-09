package com.project.kc.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.kc.model.ERole;
import com.project.kc.model.Role;
import com.project.kc.model.UserInfo;
import com.project.kc.model.Users;
import com.project.kc.payload.request.LoginRequest;
import com.project.kc.payload.request.PasswordRequest;
import com.project.kc.payload.request.RegisterRequest;
import com.project.kc.payload.request.SignupRequest;
import com.project.kc.payload.response.JwtResponse;
import com.project.kc.payload.response.MessageResponse;
import com.project.kc.repository.RoleRepository;
import com.project.kc.repository.UserInfoRepository;
import com.project.kc.repository.UserRepository;
import com.project.kc.security.jwt.JwtUtils;
import com.project.kc.security.service.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserInfoRepository userInfoRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		if (!userDetails.getIsActivated()) {
			return ResponseEntity.badRequest()
					.body(new MessageResponse("Account is deactivated! Please contact Admin to activate this account"));
		}

		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
				userDetails.getName(), userDetails.getEmail(), roles));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerAccount(@Valid @RequestBody RegisterRequest registerRequest) {
		if (userRepository.existsByUsername(registerRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(registerRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user
		Users user = new Users(registerRequest.getUsername(), registerRequest.getName(), registerRequest.getEmail(),
				encoder.encode(registerRequest.getPassword()), LocalDateTime.now(), true, LocalDateTime.now(),
				LocalDateTime.now(), false, false);

		Set<String> strRoles = registerRequest.getRoles();
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

		// create user's information
		UserInfo userInfo = new UserInfo(registerRequest.getAddress(), registerRequest.getPhone(), null, null, user);
		userInfoRepository.save(userInfo);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user
		Users user = new Users(signUpRequest.getUsername(), signUpRequest.getName(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), LocalDateTime.now(), true, LocalDateTime.now(),
				LocalDateTime.now(), false, false);

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
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/change-password")
	@PreAuthorize("hasRole('MOD') or hasRole('USER') or hasRole('ADMIN') or hasRole('ORG')")
	public ResponseEntity<?> updatePassword(@Valid @RequestBody PasswordRequest passwordRequest) {
		// get user
		Long id = passwordRequest.getId();
		Users user = userRepository.getById(id);
		// confirm password
		String currentPass = passwordRequest.getCurrentPassword();
		if (encoder.matches(currentPass, user.getPassword())) {
			user.setPassword(encoder.encode(passwordRequest.getNewPassword()));
			userRepository.save(user);
			return ResponseEntity.ok(new MessageResponse("Password is changed successfully!"));
		}

		return ResponseEntity.badRequest().body(new MessageResponse("Current Password is not correct!"));
	}
}
