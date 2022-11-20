package com.itwill.brown_carrot_market.controller;

//import lombok.AllArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

//@AllArgsConstructor
@Controller
public class CrawlingTestController {
    @GetMapping(value = "/crawling")
    public String goRegister() throws IOException {
        Document doc = Jsoup.connect("https://www.daangn.com/hot_articles").get();
        //Elements infoList = doc.select("div[class=product-name]").select("a[class=article-headline]");
        Elements infoList = doc.select("article[class=card-top]");
        //Elements contentList = doc.select("span.main-url + p");
        for (int i = 0; i < infoList.size(); i++) {
            //제목
            System.out.println(infoList.get(i).select("div[class=card-desc]").select("h2[class=card-title]").text());
            //링크
            System.out.println(infoList.get(i).select("div[class=card-desc]").select("div[class=card-price]").text());
            //이미지 url
            //String imageUrl = doc.select("a[href=" + infoList.get(i).attr("href") + "]").select("img").attr("src");
            String imageUrl = infoList.get(i).select("div[class=card-photo]").select("img").attr("src");
            System.out.println(imageUrl);
            //내용
            //String content = contentList.get(i).text();
            //System.out.println(content);

        }
        return "crawling";  
    }
    @GetMapping(value = "/crawling/town_board")
    public String goRegister_town_board() throws IOException {
    	Document doc = Jsoup.connect("https://www.daangn.com/story_articles/").get();
    	//Elements infoList = doc.select("div[class=product-name]").select("a[class=article-headline]");
    	Elements infoList = doc.select("article[class=story-article]");
    	//Elements contentList = doc.select("span.main-url + p");
    	for (int i = 0; i < infoList.size(); i++) {
    		//제목
    		System.out.println("내용: "+infoList.get(i).select("p[class=story-article-content]").text());
    		//링크
    		
    		String contentUrl = "https://www.daangn.com"+infoList.get(i).select("a[class=story-article-link]").attr("href");
    		
    		Document doc2 = Jsoup.connect(contentUrl).get();
            String content = doc2.select("div[property=schema:description]").html();
            System.out.print(content);
            System.out.print("; ");
            Elements infoList2 = doc2.select("div[class=slider-wrap]").select("div[class=image-wrap]");
            for (int j = 0; j < infoList2.size(); j++) {
            	//System.out.println(infoList2.get(j).html());
            	String imageUrl2 = infoList2.get(j).select("img").attr("data-lazy");
            	System.out.print(imageUrl2);
            	System.out.print("; ");
            	//imageUrl2 = infoList2.get(j).select("div[class=slick-cloned]").select("div[class=image-wrap]").next("img[class=portrait]").attr("src");
            	//System.out.println(imageUrl2);
            }
            System.out.println("");
    		
    	}
    	return "crawling";
    }
    @GetMapping(value = "/crawling/town_board2")
    public String goRegister_town_board2() throws IOException {
    	
    	for (int i = 475960653; i < 475960653+100; i++) {
    		try {
				
	    		Document doc = Jsoup.connect("https://www.daangn.com/story_articles/"+i).get();
	    		if(doc!=null) {
		    		Elements infoList = doc.select("article[class=story-article]");
		    		String content = doc.select("div[id=article-detail]").html();
		    		System.out.println(content);
					
		    		Elements infoList2 = doc.select("div[class=slider-wrap]").select("div[class=image-wrap]");
		            for (int j = 0; j < infoList2.size(); j++) {
		            	String imageUrl2 = infoList2.get(j).select("img").attr("data-lazy");
		            	System.out.print(imageUrl2);
		            	System.out.print("; ");
		            }
		    		
	    		}	
    		} catch (Exception e) {
    			e.printStackTrace();
    			break;
    		}
		}
    	return "crawling";
    }
    
    @GetMapping(value = "/crawling/product")
    public String goRegister_product() throws IOException {
        Document doc = Jsoup.connect("https://www.daangn.com/hot_articles").get();
        //Elements infoList = doc.select("div[class=product-name]").select("a[class=article-headline]");
        Elements infoList = doc.select("article[class=card-top]");
        //Elements contentList = doc.select("span.main-url + p");
        for (int i = 0; i < infoList.size(); i++) {
            //제목
            System.out.print(infoList.get(i).select("div[class=card-desc]").select("h2[class=card-title]").text());
            System.out.print("; ");
            //가격
            System.out.print(infoList.get(i).select("div[class=card-desc]").select("div[class=card-price]").text());
            System.out.print("; ");
            //썸네일 이미지 url
            //String imageUrl = doc.select("a[href=" + infoList.get(i).attr("href") + "]").select("img").attr("src");
            String imageUrl = infoList.get(i).select("div[class=card-photo]").select("img").attr("src");
            //System.out.println(imageUrl);
            
            
            //컨텐츠 링크
            String contentUrl = "https://www.daangn.com"+infoList.get(i).select("a[class=card-link]").attr("href");
            //System.out.println(">>>content!!");
            Document doc2 = Jsoup.connect(contentUrl).get();
            String content = doc2.select("div[property=schema:description]").html();
            System.out.print(content);
            System.out.print("; ");
            Elements infoList2 = doc2.select("div[class=slider-wrap]").select("div[class=image-wrap]");
            for (int j = 0; j < infoList2.size(); j++) {
            	//System.out.println(infoList2.get(j).html());
            	String imageUrl2 = infoList2.get(j).select("img").attr("data-lazy");
            	System.out.print(imageUrl2);
            	System.out.print("; ");
            	//imageUrl2 = infoList2.get(j).select("div[class=slick-cloned]").select("div[class=image-wrap]").next("img[class=portrait]").attr("src");
            	//System.out.println(imageUrl2);
            }
            System.out.println("");
            
            //내용
            //String content = contentList.get(i).text();slick-current
            //System.out.println(content);

        }
        return "crawling";
    }
}