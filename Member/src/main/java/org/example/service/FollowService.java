package org.example.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.annotation.TimeCheck;
import org.example.dto.member.MemberDto;
import org.example.entity.Follow;
import org.example.entity.Member;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    @PersistenceContext
    private EntityManager em;
    //Follow 신청 자신이 follower, 상대가 following
    @Transactional
    @TimeCheck
    public Follow FollowReq(String email,String MyEmail){

        Member following_member = memberRepository.findByEmail(email).get();
        Member follower_member = memberRepository.findByEmail(MyEmail).get();
        Follow follow = Follow.builder()
                .followingId(following_member)
                .followerId(follower_member)
                .build();
        //follow 관계 저장

        em.persist(follow);
        //member의 follower수 수정
        memberRepository.updateFollower(following_member);
        //member의 following수 수정
        memberRepository.updateFollowing(follower_member);

        return follow;
    }

    @TimeCheck
    public List<MemberDto> getFollower(String nickName){
        Optional<Member> member = memberRepository.findByNickName(nickName);
        return followRepository.findFollower(member.get()).stream().map(Member::toDto).toList();

    }

    @TimeCheck
    public List<MemberDto> getFollowing(String nickName){
        Optional<Member> member = memberRepository.findByNickName(nickName);
        return followRepository.findFollowing(member.get()).stream().map(Member::toDto).toList();
    }



}
