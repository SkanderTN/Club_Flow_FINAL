package com.clubflow.dto.mapper;

import com.clubflow.dto.request.MemberDto;
import com.clubflow.model.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T14:17:19+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toEntity(MemberDto memberDto) {
        if ( memberDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setAddress( memberDto.getAddress() );
        member.setBirthDate( memberDto.getBirthDate() );
        member.setClub( memberDto.getClub() );
        member.setEmail( memberDto.getEmail() );
        member.setFirstName( memberDto.getFirstName() );
        member.setImage( memberDto.getImage() );
        member.setLastName( memberDto.getLastName() );
        member.setLink( memberDto.getLink() );
        member.setPhoneNumber( memberDto.getPhoneNumber() );
        member.setRole( memberDto.getRole() );

        return member;
    }

    @Override
    public MemberDto toDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto memberDto = new MemberDto();

        memberDto.setAddress( member.getAddress() );
        memberDto.setBirthDate( member.getBirthDate() );
        memberDto.setClub( member.getClub() );
        memberDto.setConfirmPassword( member.getConfirmPassword() );
        memberDto.setEmail( member.getEmail() );
        memberDto.setFirstName( member.getFirstName() );
        memberDto.setImage( member.getImage() );
        memberDto.setLastName( member.getLastName() );
        memberDto.setLink( member.getLink() );
        memberDto.setPassword( member.getPassword() );
        memberDto.setPhoneNumber( member.getPhoneNumber() );
        memberDto.setRole( member.getRole() );

        return memberDto;
    }

    @Override
    public void updateEntity(MemberDto memberDto, Member member) {
        if ( memberDto == null ) {
            return;
        }

        if ( memberDto.getAddress() != null ) {
            member.setAddress( memberDto.getAddress() );
        }
        if ( memberDto.getBirthDate() != null ) {
            member.setBirthDate( memberDto.getBirthDate() );
        }
        if ( memberDto.getClub() != null ) {
            member.setClub( memberDto.getClub() );
        }
        if ( memberDto.getConfirmPassword() != null ) {
            member.setConfirmPassword( memberDto.getConfirmPassword() );
        }
        if ( memberDto.getEmail() != null ) {
            member.setEmail( memberDto.getEmail() );
        }
        if ( memberDto.getFirstName() != null ) {
            member.setFirstName( memberDto.getFirstName() );
        }
        if ( memberDto.getImage() != null ) {
            member.setImage( memberDto.getImage() );
        }
        if ( memberDto.getLastName() != null ) {
            member.setLastName( memberDto.getLastName() );
        }
        if ( memberDto.getLink() != null ) {
            member.setLink( memberDto.getLink() );
        }
        if ( memberDto.getPassword() != null ) {
            member.setPassword( memberDto.getPassword() );
        }
        if ( memberDto.getPhoneNumber() != null ) {
            member.setPhoneNumber( memberDto.getPhoneNumber() );
        }
        if ( memberDto.getRole() != null ) {
            member.setRole( memberDto.getRole() );
        }
    }
}
