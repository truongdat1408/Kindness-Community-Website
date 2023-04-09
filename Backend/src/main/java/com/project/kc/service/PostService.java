package com.project.kc.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.kc.model.Activity;
import com.project.kc.model.Comment;
import com.project.kc.model.Post;
import com.project.kc.model.PostStatus;
import com.project.kc.model.UserInfo;
import com.project.kc.model.Users;
import com.project.kc.payload.request.CommentRequest;
import com.project.kc.payload.request.EditPostRequest;
import com.project.kc.payload.request.PostRequest;
import com.project.kc.repository.ActivityRepository;
import com.project.kc.repository.CommentRepository;
import com.project.kc.repository.PostRepository;
import com.project.kc.repository.UserInfoRepository;
import com.project.kc.repository.UserRepository;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Transactional
	public Post create(PostRequest postReq) {
		UserInfo userInfo = userInfoRepository.findById(postReq.getUser_id()).get();
		Activity activity = activityRepository.findById(postReq.getActivity_id()).get();
		Post post = new Post(postReq.getContent(), LocalDateTime.now(), LocalDateTime.now(), postReq.getImage(), activity, userInfo, PostStatus.ACTIVATE);
		return postRepository.save(post);
	}
	
	public List<Post> getAllPostsByActivityId(Long id){
		return postRepository.findByActivityId(id);
	}
	
	@Transactional
	public Post like(long post_id, long user_id){
		Users user = userRepository.findById(user_id).get();
		Post post = postRepository.findById(post_id).get();
		if(post.getLikes().contains(user))
			post.getLikes().remove(user);
		else 
			post.getLikes().add(user);
		return postRepository.save(post);
	}
	
	@Transactional
	public Comment createComment(CommentRequest commentRequest){
		UserInfo user = userInfoRepository.findById(commentRequest.getUser_id()).get();
		Post post = postRepository.findById(commentRequest.getId()).get();
		Comment comment = new Comment(commentRequest.getContent(), commentRequest.getParent_id(), user, post);
		return commentRepository.save(comment);
	}
	
	public List<Comment> getRootComment(Long postId){
		return commentRepository.findAllRootCommentsByPostId(postId);
	}
	
	public List<Comment> getComments(Long postId, Long parentId){
		return Objects.isNull(parentId) ? getRootComment(postId) : commentRepository.findAllComments(parentId, postId);
	}
	
	public List<Comment> getRootComments(){
		return commentRepository.getAllRootComments();
	}
	
	public List<Comment> getAllReplies(){
		return commentRepository.getAllReplies();
	}
	
	@Transactional
	public void deleteComment(Long id) {
		commentRepository.deleteById(id);
		commentRepository.deleteByParentId(id);
	}
	
	@Transactional
	public void deletePost(Long id) {
		commentRepository.deleteCommentByPostId(id);
		postRepository.deleteById(id);
	}
	
	public Post editPost(EditPostRequest editPostRequest ) {
		Post post = postRepository.findById(editPostRequest.getPost_id()).get();
		post.setContent(editPostRequest.getContent());
		post.setImage(editPostRequest.getImage());
		post.setUpdatedAt(LocalDateTime.now());
		return postRepository.save(post);
	}

	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}
	
	public List<Post> getAllPostsJoinnedActivities(Long profile_id){
		List<Post> posts = postRepository.findAll();
		List<Post> filPosts = new ArrayList<>();
		for(int i = 0; i < posts.size(); i++) {
		 	List<UserInfo> userInfos = userInfoRepository.getMembersByActivityId(posts.get(i).getActivity().getId());
			for(int j = 0; j < userInfos.size(); j++) {
				if (userInfos.get(j).getId() == profile_id) {
					filPosts.add(posts.get(i));
					break;
				}
			}
		}
		return filPosts;
	}
}
