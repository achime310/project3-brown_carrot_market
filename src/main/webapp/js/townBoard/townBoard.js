function changeQnaList(pageno,t_ctgr_no){
	
	$.ajax({
		url: "townBoard_list_rest",
		method: "post",
		data: {
			"pageno" :pageno,
			"t_ctgr_no":t_ctgr_no
				},
		dataType: "json",
		success:function(resultObj){
			console.log(resultObj);
			if(resultObj.errorCode > 0){
				let data = resultObj.data;
				let htmlBuffer = ``;
				data.itemList.forEach(function(townBoard, i){
				
				   htmlBuffer += `<div class="blog_post_thumb">`;
	               if(townBoard.townImageList.length != 0 ){
						htmlBuffer += `
                            <a href="townboard_view?t_no=${townBoard.t_no}&pageno=${pageno}" t_no="${townBoard.t_no}"><img src="img/townBoard-img/${townBoard.townImageList[0].t_img_name}" alt="blog-post-thumb"></a>`;
					}
	               
					htmlBuffer += `
	                              
                            
                        </div>
                        <div class="blog_post_content">
                        
                        <div class="post-date">
                                <a href="#">${townBoard.townCategory.t_ctgr_name}</a>
                                <span>์กฐํ์ : ${townBoard.t_count}</span>
                            </div>
                            <a href="townboard_view?t_no=${townBoard.t_no}&pageno=${pageno}" t_no="${townBoard.t_no}" pageno="${pageno}" class="blog_title">${townBoard.t_title}</a>
                            <p>${townBoard.t_content}</p>
                            <a href="#"><i class="fa fa-location-arrow" aria-hidden="true"></i> ${townBoard.t_address_name }</a>
                        </div>
                        `;
                     
				});
				$("#townBoard_list_tbody_all" ).html(htmlBuffer);
				
				let paginationBuffer = ``;
				if(data.pageMaker.prevPage > 0){
					paginationBuffer += `<li class="page-item">
		                                    <button class="page-link" onclick="changeQnaList(${data.pageMaker.prevPage},'${t_ctgr_no}');"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
		                               	 </li>`;
				}
				for(let no = data.pageMaker.blockBegin; no <= data.pageMaker.blockEnd; no++){
					if(data.pageMaker.curPage == no){
						paginationBuffer += `<li class="page-item active"><button class="page-link" href="#">${no}</button></li>`;
					}
					if(data.pageMaker.curPage != no){
						paginationBuffer += `<li class="page-item"><button class="page-link" onclick="changeQnaList(${no},'${t_ctgr_no}');">${no}</button></li>`;
					}
				}
				if(data.pageMaker.curPage < data.pageMaker.totPage){
					paginationBuffer += `<li class="page-item">
					                        <button class="page-link" onclick="changeQnaList(${data.pageMaker.nextPage},'${t_ctgr_no}');"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
				                    	 </li>`;
				}
				$(".pagination.pagination-sm.justify-content-center").html(paginationBuffer);
			}else{
				Toast.fire({ icon: 'error', title: resultObj.errorMsg });
			}
		}
	});
}


/*
๊ฒ์๊ธ ์ญ์? 
*/
$(".townBoard_btn.delete").on("click", function(){
	let pageno = $(this).attr("pageno");
	let t_no = $(this).attr("t_no");
	ToastConfirm.fire({ icon: 'question', 
						title: "๊ฒ์๊ธ์ ์ญ์?ํ์๊ฒ?์ต๋๊น?\n ์ญ์? ํ ๋ณต๊ตฌ๊ฐ ๋ถ๊ฐ๋ฅํฉ๋๋ค"}).then((result) => {
						if(result.isConfirmed){
							$.ajax({
								url: "townBoard_delete_rest",
								method: "post",
								data: {"t_no":t_no},
								dataType: "json",
								success:function(resultObj){
									if(resultObj.errorCode > 0){
										Toast.fire({ icon: 'success', title: resultObj.errorMsg }).then((result) => {
												location.href = "townBoard_list?pageno=" + pageno;
											});
									}else{
										Toast.fire({ icon: 'error', title: resultObj.errorMsg });
									}
								}
							});
						}
	});
});






/*
๊ฒ์๊ธ ๋ชฉ๋ก ์ด๋
*/

$(".townBoard_btn.list").on("click", function(){
	let pageno = $(this).attr("pageno");
	location.href = `townBoard_list?pageno=${pageno}`;
});



/*
๊ฒ์๊ธ ์์? ํผ 
*/
$(".townBoard_btn.update_form").on("click", function(){
	let t_no = $(this).attr("t_no");
	let pageno = $(this).attr("pageno");
	console.log(t_no);
	console.log(pageno);
	location.href = `townboard_update_form?t_no=${t_no}&pageno=${pageno}`;
});

/* 
๊ฒ์๊ธ ์์? 
*/ 
/*
$(".townBoard_btn.update").on("click", function(){ 
	if($("#t_title_txt").val() == "" || CKEDITOR.instances.townBoard_content_area.getData() == ""){
		Toast.fire({ icon: 'warning', title: "ํ์ ์๋?ฅ๊ฐ์ ์๋?ฅํ์ง ์์์ต๋๋ค.\n ์?๋ชฉ๊ณผ ๋ด์ฉ์ ๋ชจ๋ ์๋?ฅํด์ฃผ์ธ์" });
		return;
	}
		ToastConfirm.fire({ icon: 'question', 
							title: "๊ฒ์๊ธ์ ์์?ํ์๊ฒ?์ต๋๊น?"}).then((result) => {
							if(result.isConfirmed){
								let t_no = $(this).attr("t_no"); 
								let pageno = $(this).attr("pageno");
								$("#townBoard_update_form").attr("action", "townboard_update_action"); 
								$("#townBoard_update_form").submit(); 
							}
					});
});
*/

/*
์๊ธ ๋ฑ๋ก ํผ 
*/
$(".townBoard_btn.write_form").on("click", function(){
	let pageno = $(this).attr("pageno");
	location.href = "townboard_write_form?pageno=" + pageno;
});




/*
๊ฒ์๊ธ ๋ฑ๋ก
*/
/*
$(".townBoard_btn.new_write").on("click", function(e){
	e.preventDefault();
	e.stopPropagation();
	var form=$("#townBoard_write_form");
	let pageno = form.find($('input[name="page_no"]')).val();
	let t_no = form.find($('input[name="t_no"]')).val();

	if($("#t_title_txt").val() == "" || CKEDITOR.instances.townBoard_content_area.getData() == ""){
		Toast.fire({ icon: 'warning', title: "ํ์ ์๋?ฅ๊ฐ์ ์๋?ฅํ์ง ์์์ต๋๋ค.\n ์?๋ชฉ๊ณผ ๋ด์ฉ์ ๋ชจ๋ ์๋?ฅํด์ฃผ์ธ์" });
		return;
	}
	else{
		ToastConfirm.fire({ icon: 'question', 
							title: "๊ฒ์๊ธ์ ์์ฑํ์๊ฒ?์ต๋๊น?"}).then((result) => {
								if(result.isConfirmed){
								/*	
							$.ajax({
								url: "townReply_wirte_rest",
								method: "post",
								data: form.serialize(),
								dataType: "json",
								success:function(resultObj){
									console.log('์ฑ๊ณต');
									if(resultObj.errorCode > 0){
										Toast.fire({ icon: 'success', title: resultObj.errorMsg }).then((result) => {
											console.log('ํ์ด์ง์ด๋');
												location.href = "townboard_view?t_no="+t_no+"&pageno=" + pageno;
											});
									}else{
										Toast.fire({ icon: 'error', title: resultObj.errorMsg });
									}
								}
							});////์์์ค ๋////
							
							   //์ฌ์ง ๋ฆฌ์คํธ ์๋ก๋
  							 // const formData1 = new FormData($('#main_contact_form_townBoard')[0]);
  							 const formData1 = new FormData($('#main_contact_form_townBoard')[0]);
							  $.ajax({
								      url:'townboard_write_action_json',
								      type:'POST',
								      processData:false,   //ํ์ผ์?์ก์ ๋ฐ๋์ false
								      contentType:false,
								      data:formData1,
								      success:function(jsonResult){
								      console.log(jsonResult);
								      window.location.href="townboard_list";
       
      }
   });
							
						}
							
					});				
	
/////์ฌ๊ธฐ ์๋ฆฌ
/*	$(".townReply_write_form").attr("action", "townReply_wirte_rest");
	$(".townReply_write_form").submit();	
}	
	
});
*/
//๊ฒ์๊ธ ๋ฑ๋ก
function townBoardCreate() {
   if (document.townBoard_write_form.t_title.value == "") {
      alert("์?๋ชฉ์ ์๋?ฅํ์ญ์์.");
      document.townBoard_write_form.t_title.focus();
      return false;
   }
   /*
   if (document.townBoard_write_form.t_content.value == "") {
      alert("๋ด์ฉ์ ์๋?ฅํ์ญ์์.");
      document.townBoard_write_form.t_content.focus();
      return false;
   }
   */
   //์ฌ์ง ๋ฆฌ์คํธ ์๋ก๋
   const formData1 = new FormData($('#main_contact_form_townBoard')[0]);
   /*
   formData1.append('files',$('#files')[0]); //์ด๊ฒ ๋ง๋?
   formData1.append('files',$('#files')[1]); 
   formData1.append('files',$('#files')[2]); 
   formData1.append('files',$('#files')[3]); 
   */
   
   console.log(formData1);
   
   $.ajax({
      url:'townboard_write_action_json',
      type:'POST',
      processData:false,   //ํ์ผ์?์ก์ ๋ฐ๋์ false
      contentType:false,
      data:formData1,
      success:function(jsonResult){
      console.log(jsonResult);
      window.location.href="townBoard_list";
       /*์ฌ์ง์ด๋ฆ๋ฐ๊ธฐ
       $.ajax({
              url : 'product_write_action_json',
              method : 'POST',
              data: {
                  "p_title":$("input[name='p_title']").val(),
                  "p_price":$("input[name='p_price']").val(),
                  "p_ctgr_no":$("input[name='p_ctgr_no']").val(),
                  "p_desc":$("input[name='p_desc']").val(),
                  "pi_name": jsonResult.newFileName 
                     },
                     dataType : 'json',
                     success : function(jsonResult) {
                        console.log(jsonResult.msg);
         }
        });
        */
      }
   });
   }


//๊ฒ์๊ธ ์์?
function townBoardUpdateAction(){
	if (document.townBoard_update_form.t_title.value == "") {
      alert("์?๋ชฉ์ ์๋?ฅํ์ญ์์.");
      document.townBoard_update_form.t_title.focus();
      return false;
   }

   if (document.townBoard_update_form.t_content.value == "") {
      alert("๋ด์ฉ์ ์๋?ฅํ์ญ์์.");
      document.townBoard_update_form.t_content.focus();
      return false;
   }
 
   
   const formData1 = new FormData($('#main_contact_form_townBoard')[0]);
   /*
   formData1.append('files',$('#files')[0]); //์ด๊ฒ ๋ง๋?
   formData1.append('files',$('#files')[1]); 
   formData1.append('files',$('#files')[2]); 
   formData1.append('files',$('#files')[3]); 
   */
      
   $.ajax({
      url:'townboard_update_action_json',
      type:'POST',
      processData:false,   //ํ์ผ์?์ก์ ๋ฐ๋์ false
      contentType:false,
      data:formData1,
      success:function(jsonResult){
      console.log(jsonResult);
      window.location.href="townBoard_list";
   
   /*
   document.product_modify_form.action = "product_modify_action";
   document.product_modify_form.method='POST';
   document.product_modify_form.submit();
	*/
  		}
   	});
   }






/*
๋ต๊ธ ๋ฑ๋ก
*/
$(".qna_btn.reply_write").on("click", function(){
	if($("#q_title_txt").val() == "" || CKEDITOR.instances.q_content_area.getData() == ""){
		Toast.fire({ icon: 'warning', title: "ํ์ ์๋?ฅ๊ฐ์ ์๋?ฅํ์ง ์์์ต๋๋ค.\n ์?๋ชฉ๊ณผ ๋ด์ฉ์ ๋ชจ๋ ์๋?ฅํด์ฃผ์ธ์" });
		return;
	}
	$("#qna_reply_write_form").attr("action", "qna_reply_write");
	$("#qna_reply_write_form").submit();
});



/*
๋๊ธ๋ฑ๋ก
*/
$("#townMainReplyBtn").on("click", function(e){
	e.preventDefault();
	e.stopPropagation();
	var form=$(".townReply_Main_write_form");
	let pageno = form.find($('input[name="page_no"]')).val();
	let t_no = form.find($('input[name="t_no"]')).val();

	if($(".form-group.t_reply_title").val() == "" || $(".t_reply_content").val() == ""){
		Toast.fire({ icon: 'warning', title: "ํ์ ์๋?ฅ๊ฐ์ ์๋?ฅํ์ง ์์์ต๋๋ค.\n ์?๋ชฉ๊ณผ ๋ด์ฉ์ ๋ชจ๋ ์๋?ฅํด์ฃผ์ธ์" });
		return;
	}
	else{
		ToastConfirm.fire({ icon: 'question', 
							title: "๋๊ธ์ ์์ฑํ์๊ฒ?์ต๋๊น?"}).then((result) => {
								if(result.isConfirmed){
									
							$.ajax({
								url: "townReply_wirte_rest",
								method: "post",
								data: form.serialize(),
								dataType: "json",
								success:function(resultObj){
									console.log('์ฑ๊ณต');
									if(resultObj.errorCode > 0){
										Toast.fire({ icon: 'success', title: resultObj.errorMsg }).then((result) => {
											console.log('ํ์ด์ง์ด๋');
												location.href = "townboard_view?t_no="+t_no+"&pageno=" + pageno;
											});
									}else{
										Toast.fire({ icon: 'error', title: resultObj.errorMsg });
									}
								}
							});
						}
							
					});				
}	
	
});


/*
๋๋๊ธ๋ฑ๋ก
*/
$(".btn.btn-primary.rereply").on("click", function(e){
	e.preventDefault();
	e.stopPropagation();
	/***************์์?ํด์ผํใ */
	console.log($(e.target).attr("index"));
	console.log($(".townReReply_write_form_"+$(e.target).attr("index")));
	
	//index=$('.content>form').attr("index");
	index=$(e.target).attr("index");
	console.log(index);
	var form=$(".townReReply_write_form_"+index);
	
	/*
	index=$('this').attr("index");
    console.log(index);
     var replyNumber=$('#ReplyNumber').val();
    for(var i=0;i<replyNumber;i++){
	var form=$(".townReReply_write_form_"+i);
	}
	*/
	let pageno = form.find($('input[name="page_no"]')).val();
	let t_no =form.find($('input[name="t_no"]')).val();
	let groupno = form.find($('input[name="groupno"]')).val();
	console.log('t_no'+t_no)
	
	if($(".form-group.t_reply_title").val() == "" || $(".t_reply_content").val() == ""){
		Toast.fire({ icon: 'warning', title: "ํ์ ์๋?ฅ๊ฐ์ ์๋?ฅํ์ง ์์์ต๋๋ค.\n ์?๋ชฉ๊ณผ ๋ด์ฉ์ ๋ชจ๋ ์๋?ฅํด์ฃผ์ธ์" });
		return;
	}
	else{
		ToastConfirm.fire({ icon: 'question', 
							title: "๋๊ธ์ ์์ฑํ์๊ฒ?์ต๋๊น?"}).then((result) => {
								if(result.isConfirmed){
									console.log()
							$.ajax({
								url: "townReReply_wirte_rest",
								method: "post",
								data: form.serialize(),
								dataType: "json",
								success:function(resultObj){
									console.log('๋๋ฒ์จฐ๊น์ง ์ฑ๊ณต')
									if(resultObj.errorCode > 0){
										Toast.fire({ icon: 'success', title: resultObj.errorMsg }).then((result) => {
											console.log('ํ์ด์ง์ด๋');
												location.href = "townboard_view?t_no="+t_no+"&pageno=" + pageno;
											});
									}else{
										Toast.fire({ icon: 'error', title: resultObj.errorMsg });
									}
								}
							});
						}
							
					});				
}	
	
});


/*
๋๊ธ ์ญ์? 
*/
$(".townReply.delete").on("click", function(){
	let pageno = $(this).attr("pageno");
	let t_reply_no = $(this).attr("t_reply_no");
	let t_no = $(this).attr("t_no");
	ToastConfirm.fire({ icon: 'question', 
						title: "๋๊ธ์ ์ญ์?ํ์๊ฒ?์ต๋๊น?\n ์ญ์? ํ ๋ณต๊ตฌ๊ฐ ๋ถ๊ฐ๋ฅํฉ๋๋ค"}).then((result) => {
						if(result.isConfirmed){
							$.ajax({
								url: "townReply_delete_rest",
								method: "post",
								data: {"t_reply_no":t_reply_no
										},
								dataType: "json",
								success:function(resultObj){
									if(resultObj.errorCode > 0){
										Toast.fire({ icon: 'success', title: resultObj.errorMsg }).then((result) => {
												location.href = "townboard_view?t_no="+t_no+"&pageno=" + pageno;
											});
									}else{
										Toast.fire({ icon: 'error', title: resultObj.errorMsg });
									}
								}
							});
						}
	});
});



/*
๋๊ธ ํ?๊ธ2
*/
/** ๊ฒ์๊ธ์ ์์?๋ฒํผ, ์ญ์?๋ฒํผ **/
$(document).ready(function() {
  $(".content").hide();
  var loginId=sessionStorage.getItem('sUserId');
  var writeId=$('#viewWriterId').text();
  console.log($(this));
  index=$(this).attr("index");
  
  $('view')
  console.log("๋๊ธ ์ธ๋ฑ์ค:"+index);
  
  
  var replyNumber=$('#ReplyNumber').val();
  console.log("๋๊ธ์:"+replyNumber);
  
   for(var i=0;i<replyNumber;i++){
	var replyId=$('#viewReplyWriterId_'+i).text();
	var rereplyId=$('#viewReReplyWriterId_'+i).text();
	console.log("๋๊ธ ์์ด๋:"+replyId);
	if(replyId==loginId){
		console.log("๊ฐ์ ์์ฑ์:"+i);
		$('#townReplyDeletebtn_'+i).show();
	}else{
		console.log("๋ค๋ฅธ ์์ฑ์:"+i);
		$('#townReplyDeletebtn_'+i).hide();
	}
	if(rereplyId==loginId){
		$('#reReplyDeleteBtn_'+i).show();
	}else{
		$('#reReplyDeleteBtn_'+i).hide();
	}
	
	
   }
  var replyWriteId=$('#viewReplyWriterId_'+index).text();
 
  var rereplyWriteId=$('#viewReReplyWriterId_'+index).text();
  
/* ๊ฒ์๊ธ ์ญ์? ์์?๋ฒํผ */
  if(loginId==writeId){
  console.log("๊ฒ์๊ธ ๊ฐ์ ์์ฑ์")
	$('.townBoard_btn.update_form').show();
	$('.townBoard_btn.delete').show();
	
}else{
	console.log("๊ฒ์๊ธ ๋ค๋ฅธ ์์ฑ์")
	$('.townBoard_btn.update_form').hide();
	$('.townBoard_btn.delete').hide();
}


/* ๋๊ธ์ ์ญ์?๋ฒํผ */
/*
  if(loginId==replyWriteId){
  console.log("๋๊ธ ๊ฐ์ ์์ฑ์")
	$('.townReply.delete.reply').show();
	
}else if(loginId!=replyWriteId){
	console.log("๋๊ธ ๋ค๋ฅธ ์์ฑ์")
	$('.townReply.delete.reply').hide();
}
*/

/* ๋๋๊ธ์ ์ญ์?๋ฒํผ */
/*
  if(loginId==rereplyWriteId){
  console.log("๋๋๊ธ ๊ฐ์ ์์ฑ์")
	$('.townReply.delete.rereply').show();
	
}else if(loginId!=rereplyWriteId){
	console.log("๋๋๊ธ ๋ค๋ฅธ ์์ฑ์")
	$('.townReply.delete.rereply').hide();
}
*/


  $(".heading").click(function()
  {
    $(this).next(".content").slideToggle(500);
  });
});
/**************** */


/*
$(document).ready(function() {
  var loginId=sessionStorage.getItem('sUserId');
  index=$(this).attr("index");
  var replyWriteId=$('#viewReplyWriterId_'+index).text();


/* ๋๊ธ์ ์ญ์?๋ฒํผ 
  if(loginId==replyWriteId){
  console.log("๊ฐ์ ์์ฑ์")
	$('.townReply.delete').show();
	
}else{
	console.log("๋ค๋ฅธ ์์ฑ์")
	$('.townReply.delete').hide();
}



});

$(document).ready(function() {
  var loginId=sessionStorage.getItem('sUserId');
  index=$(this).attr("index");
  var rereplyWriteId=$('#viewReReplyWriterId_'+index).text();


/* ๋๋๊ธ์ ์ญ์?๋ฒํผ 
  if(loginId==rereplyWriteId){
  console.log("๊ฐ์ ์์ฑ์")
	$('.townReply.delete').show();
	
}else{
	console.log("๋ค๋ฅธ ์์ฑ์")
	$('.children>.townReply.delete').hide();
}



});
*/

/*
ckeditor
*/

$(() => {
	if($("#notice_content_area").length != 0){
		 CKEDITOR.replace('notice_content_area', {
						height: 500                                                  
                 	});
	}
});
$(() => {
	if($("#townBoard_content_area").length != 0){
		 CKEDITOR.replace('townBoard_content_area', {
						height: 500                                                  
                 	});
	}
});


/*
alert ์ธํ
*/
const Toast =  Swal.mixin({ 
	toast: true, 
	position: 'center', 
	showConfirmButton: true, 
	confirmButtonColor: '#3085d6',
	width: '400px'
 });

const ToastConfirm =  Swal.mixin({ 
	toast: true, 
	position: 'center', 
	showConfirmButton: true, 
	confirmButtonColor: '#3085d6',
	showDenyButton: true,
	denyButtonText: 'Cancel',
	width: '400px'
 });

$(function(){
	$("#townBoardSearch").keypress(function(e) {
  if (e.keyCode === 13) {
	location.href="townBoardSearch_list?search_keyword="+$("#townBoardSearch").val();
    e.preventDefault();
  
  }
});
	
})

////////////// ์ฌ๋ผ์ด๋์ผ ์์ ///////////////
$(document).ready(function () {
    $('.bxslider').bxSlider({
        auto: true, // ์๋์ผ๋ก ์?๋๋ฉ์ด์ ์์
        speed: 500,  // ์?๋๋ฉ์ด์ ์๋
        pause: 5000,  // ์?๋๋ฉ์ด์ ์?์ง ์๊ฐ (1000์ 1์ด)
        mode: 'horizontal', // ์ฌ๋ผ์ด๋ ๋ชจ๋ ('fade', 'horizontal', 'vertical' ์ด ์์)
        autoControls: true, // ์์ ๋ฐ ์ค์ง๋ฒํผ ๋ณด์ฌ์ง
        pager: true, // ํ์ด์ง ํ์ ๋ณด์ฌ์ง
        captions: true,
        slideWidth: 650, // ์ด๋ฏธ์ง ์์ ํ์คํธ๋ฅผ ๋ฃ์ ์ ์์
    });
});
////////////// ์ฌ๋ผ์ด๋์ผ ๋ ///////////////

