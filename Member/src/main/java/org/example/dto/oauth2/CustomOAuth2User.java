package org.example.dto.oauth2;

import lombok.Getter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;


@Getter
public class CustomOAuth2User extends DefaultOAuth2User {
    private final String email;
    private final String role;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities
            , Map<String, Object> attributes
            , String nameAttributeKey
            ,String email,String role) {
        super(authorities, attributes, nameAttributeKey);
        this.role=role;
        this.email=email;
    }
}
