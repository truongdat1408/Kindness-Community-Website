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

import com.project.kc.model.Comment;
import com.project.kc.model.Post;
import com.project.kc.payload.request.CommentRequest;
import com.project.kc.payload.request.EditPostRequest;
import com.project.kc.payload.request.LikeRequest;
import com.project.kc.payload.request.PostRequest;
import com.project.kc.payload.response.MessageResponse;
import com.project.kc.service.PostService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/post")
public class PostController {
	@Autowired
	private PostService postService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@Valid @RequestBody PostRequest postRequest){
		Post post = postService.create(postRequest);
		return ResponseEntity.ok(post);
	}
	
	@GetMapping("/all/{id}")
	public ResponseEntity<?> getAllPostsByActivityId(@PathVariable("id") Long id){
		List<Post> posts = postService.getAllPostsByActivityId(id);
		return ResponseEntity.ok(posts);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllPosts(){
		List<Post> posts = postService.getAllPosts();
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}
	
	@GetMapping("/all-joinned/{id}")
	public ResponseEntity<?> getAllPostsJoinned(@PathVariable("id") Long profileId){
		List<Post> posts = postService.getAllPostsJoinnedActivities(profileId);
		return new ResponseEntity<>(posts, HttpStatus.OK);
	}
	
	@PostMapping("/like")
	public ResponseEntity<?> like(@Valid @RequestBody LikeRequest likeRequest){
		Post post = postService.like(likeRequest.getId(), likeRequest.getUser_id());
		return ResponseEntity.ok(post);
	}
	
	@PostMapping("/comment")
	public ResponseEntity<?> comment(@Valid @RequestBody CommentRequest commentRequest){
		Comment comment = postService.createComment(commentRequest);
		return ResponseEntity.ok(comment);
	}
	
	@GetMapping("/rootcomment")
	public ResponseEntity<?> getRootComments(){
		List<Comment> rootComments = postService.getRootComments();
		return ResponseEntity.ok(rootComments);
	}
	
	@GetMapping("/replies")
	public ResponseEntity<?> getReplies(){
		List<Comment> replies = postService.getAllReplies();
		return ResponseEntity.ok(replies);
	}
	
	@PostMapping("/delete-comment/{id}")
	public ResponseEntity<?> deleteComment(@PathVariable("id") Long id){
		try {
			postService.deleteComment(id);
		}catch(Exception e) {
			System.out.println("AAAAAAAAAA");
			System.out.println(e);
		}
		
		return ResponseEntity.ok(new MessageResponse("Delete successfully!"));
	}
	
	@PostMapping("/delete-post/{id}")
	public ResponseEntity<?> deletePost(@PathVariable("id") Long id){
		try {
			postService.deletePost(id);
		}catch(Exception e) {
			System.out.println("AAAAAAAAAA: " + e);
		}
		
		return ResponseEntity.ok(new MessageResponse("Delete successfully!"));
	}
	
	@GetMapping({"/comment/{postId}/{parentId}", "/comment/{postId}"})
	public ResponseEntity<?> getComments(@PathVariable("postId") Long postId, @PathVariable(name = "parentId", required = false) Long parentId){
		List<Comment> rootComments = postService.getComments(postId, parentId);
		return ResponseEntity.ok(rootComments);
	}
	
	@PostMapping("/edit")
	public ResponseEntity<?> editPost(@Valid @RequestBody EditPostRequest editPostRequest){
		Post post = postService.editPost(editPostRequest);
		return ResponseEntity.ok(postService.getAllPostsByActivityId(post.getActivity().getId()));
	}
}
