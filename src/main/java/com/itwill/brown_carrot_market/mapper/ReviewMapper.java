package com.itwill.brown_carrot_market.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.itwill.brown_carrot_market.dto.Review;

@Mapper
public interface ReviewMapper {

	/*
	 * @Insert("")
	 */
	public int createReview(Review review);

	//받은리뷰 전체 게시글 수 계산
	public int countReceivedReview(String user_id);
	
	public List<Review> findReceivedReview(String user_id);

	public List<Review> findReceivedReviewByBuyer(String user_id);

	public List<Review> findReceivedReviewBySeller(String user_id);

	public Review findReviewByRivewNo(int review_no);

	public Review isExistedReviewByOrdersNoId(Review review);
	
	public int removeReview(int review_no);
	
	public int updateReview(Review review);
	
	//리뷰 전체조회--페이징 처리
	public List<Review> selectedRangeReview(int pageStart, int pageEnd, String user_id);
}
