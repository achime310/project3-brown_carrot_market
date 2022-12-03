package com.itwill.brown_carrot_market.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Spring Security 사용을 위한 Configuration Class를 작성하기 위해서
 * WebSecurityConfigurerAdapter를 상속하여 클래스를 생성하고
 * @Configuration 애노테이션 대신 @EnableWebSecurity 애노테이션을 추가한다.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  /**
   * PasswordEncoder를 Bean으로 등록
   */
  @Bean
  public PasswordEncoder getPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
  
  /**
   * 인증 or 인가에 대한 설정
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
	    .cors().disable()      // cors 비활성화
	    .csrf().disable()      // csrf 비활성화
	    .formLogin().disable() //기본 로그인 페이지 없애기
	    .headers().frameOptions().disable();
    /*참고
	    .csrf().disable() // post 방식으로 값을 전송할 때 token을 사용해야하는 보안 설정을 해제
	    .authorizeRequests()
	    .antMatchers("localhost/brown_carrot_market/","/", "/user_login").permitAll() //antMatchers에서 설정한 URL의 접근을 인증없이 허용
	    .anyRequest().authenticated();
     * antMatchers("/admin/**").hasAnyRole("ADMIN") //설정한 URL들은 ADMIN 권한의 유저만 허용
     * anyRequest().authenticated()	//모든 리소스가 인증을 해야만 접근이 허용된다
     */
  }
}
