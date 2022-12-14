<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>	
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!-- 
<jsp:useBean id="toDay" class="java.util.Date" />
<fmt:formatDate var="to_date" value='${toDay}' pattern='yyyy-MM-dd' />
<fmt:formatDate var="q_date" value='${qna.q_date}' pattern='yyyy-MM-dd' />
 -->

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

	<!-- Title  -->
    <title>공지사항</title>

    <!-- Favicon  -->
    <link rel="icon" href="img/core-img/favicon.ico">
	
    <!-- include_common_top -->
	
    <!-- include_common_top -->
    
     <!-- Style CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/board.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.9/dist/sweetalert2.min.css">
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.9/dist/sweetalert2.all.min.js"></script>
	
	<!-- toast -->
 <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
   

	
	
	
	
</head>

<body>
    <!-- Preloader -->
    <!-- 
    <div id="preloader">
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
	 -->
	 
    <!-- Header Area -->
    <!-- include_common_header.jsp start-->
			<jsp:include page="common/include_common_header.jsp"/>
		<!-- include_common_header.jsp end-->
  	
    <!-- Header Area End -->
    
    <!-- Breadcumb Area -->
    <div class="breadcumb_area">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <h5>공지사항</h5>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">흙당근마켓</a></li>
                        <li class="breadcrumb-item active">공지사항</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcumb Area -->

    <div class="shortcodes_area section_padding_100">
        <div class="container">
            <div class="row">
                <div class="col-12 notice_list_view">
                    <div class="shortcodes_title mb-30">
                        <h4>공지사항</h4>
                    </div>
                    <div class="shortcodes_content">
                        <div class="table-responsive">
                            <table class="table mb-0 table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" class="board_no">분류</th>
                                        <th scope="col" class="board_title">제목</th>
                                        <th scope="col" class="board_date">날짜</th>
                                        <th scope="col" class="board_count">조회수</th>
                                    </tr>
                                </thead>
                                <tbody id="notice_list_tbody">
                                
                                	<!-- board start -->
                                	<c:forEach var="notice" items="${noticeList.itemList}">
	                                    <tr>
	                                    <!-- 
	                                        <th scope="row">${notice.notice_no}</th>
	                                         -->
	                                         <th>
	                                         	<c:if test="${notice.notice_fix eq '1'}">
	                                        			&nbsp;&nbsp;<span class="badge badge-danger">중요</span>
                                        		</c:if>
                                        		<c:if test="${notice.notice_fix eq '0'}">
                                        			&nbsp;&nbsp;<span class="badge badge-normal">일반</span>
                                        		</c:if>
	                                         </th>
	                                        <td>
	                                        	<a href="notice_view?notice_no=${notice.notice_no}&pageno=${noticeList.pageMaker.curPage}">
	                                        		${notice.notice_title}
	                                        	</a>
	                                        </td>
	                                        <td>${notice.notice_date}</td>
	                                        <td>${notice.notice_count}</td>
	                                    </tr>
                                    </c:forEach>
                                   <!-- board end -->
                 
                                </tbody>
                            </table>
						
                        </div>
                    </div>
					<input type="button" class="notice_btn write_form" pageno="${pageno}" value="게시글작성" />
                </div>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-12 col-lg-9">
                    <!-- Shop Pagination Area -->
                    <div class="shop_pagination_area mt-5">
                        <nav aria-label="Page navigation">
                            <ul class="pagination pagination-sm justify-content-center">

                            	<c:if test="${noticeList.pageMaker.prevPage > 0}">  
	            					<li class="page-item">
	                                    <button class="page-link" onclick="changeQnaList(${data.pageMaker.prevPage});"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
	                               	 </li>
                                </c:if>
                                <c:forEach var="no" begin="${noticeList.pageMaker.blockBegin}" end="${noticeList.pageMaker.blockEnd}">
									<c:if test="${noticeList.pageMaker.curPage == no}">
										<li class="page-item active"><button class="page-link" href="#">${no}</button></li>
									</c:if>
									<c:if test="${noticeList.pageMaker.curPage != no}">
										<li class="page-item"><button class="page-link page" onclick="changeQnaList(${no})">${no}</button></li>
									</c:if>
                                </c:forEach>
                                <c:if test="${noticeList.pageMaker.curPage < noticeList.pageMaker.totPage}">  
	                                <li class="page-item">
				                        <button class="page-link" onclick="changeQnaList(${noticeList.pageMaker.nextPage})"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
			                    	 </li>
                                </c:if>

                            </ul>
                        </nav>
                    </div>
                    
                </div>
            </div>
            
            
            
         </div>
    </div>     
            
    <!-- Footer Area -->
    	<!-- include_common_bottom.jsp start-->
			<jsp:include page="common/include_common_footer.jsp"/>
		<!-- include_common_bottom.jsp end-->
    <!-- Footer Area -->

    <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/default/classy-nav.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/default/scrollup.js"></script>
    <script src="js/waypoints.min.js"></script>
    <script src="js/jquery.countdown.min.js"></script>
    <script src="js/jquery.counterup.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/jarallax.min.js"></script>
    <script src="js/jarallax-video.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/jquery.nice-select.min.js"></script>
    <script src="js/wow.min.js"></script>
    <script src="js/default/active.js"></script>
    
    	<!-- javaScript -->
	<!-- <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script> -->
	<script type="text/javascript" src="js/user/UserHtmlContents.js"></script>
	<script type="text/javascript" src="js/common/CommonHtmlContents.js"></script>
	<script type="text/javascript" src="js/common/user_session_check.js"></script>
	<!--
	
	  -->
	<script type="text/javascript" src="ckeditor/ckeditor.js"></script>
	<script src="js/notice/board.js" defer></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
	
	 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>  

<style type="text/css">
#toast-container > .toast {
    background-image: none !important;
}

 #toast-container > .toast:before {
    position: relative;
    font-family: FontAwesome;
    font-size: 24px;
    line-height: 18px;
    float: left;
    color: #FFF;
    padding-right: 0.5em;
    margin: auto 0.5em auto -1.5em;
}       
    #toast-container > .toast-warning:before {
     content: "\f27a"; 
 
} 

 #toast-container > .toast-success:before {
     content: "\f2b5"; 
 
} 
	

</body>

</html>