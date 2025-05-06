package com.clubflow.dto.mapper;

import com.clubflow.dto.request.UserDto;
import com.clubflow.dto.response.UserResponse;
import com.clubflow.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T14:17:19+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toEntity(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User user = new User();

        user.setAddress( userDto.getAddress() );
        user.setBirthDate( userDto.getBirthDate() );
        user.setClub( userDto.getClub() );
        user.setEmail( userDto.getEmail() );
        user.setFirstName( userDto.getFirstName() );
        user.setImage( userDto.getImage() );
        user.setLastName( userDto.getLastName() );
        user.setPassword( userDto.getPassword() );
        user.setPhoneNumber( userDto.getPhoneNumber() );
        user.setRole( userDto.getRole() );

        return user;
    }

    @Override
    public UserResponse toResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setAddress( user.getAddress() );
        userResponse.setBirthDate( user.getBirthDate() );
        userResponse.setClub( user.getClub() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setFirstName( user.getFirstName() );
        userResponse.setId( user.getId() );
        userResponse.setImage( user.getImage() );
        userResponse.setLastName( user.getLastName() );
        userResponse.setPhoneNumber( user.getPhoneNumber() );
        userResponse.setRole( user.getRole() );

        userResponse.setRoles( mapRoles(user.getRoles()) );

        return userResponse;
    }

    @Override
    public void updateEntity(UserDto userDto, User user) {
        if ( userDto == null ) {
            return;
        }

        if ( userDto.getAddress() != null ) {
            user.setAddress( userDto.getAddress() );
        }
        if ( userDto.getBirthDate() != null ) {
            user.setBirthDate( userDto.getBirthDate() );
        }
        if ( userDto.getClub() != null ) {
            user.setClub( userDto.getClub() );
        }
        if ( userDto.getEmail() != null ) {
            user.setEmail( userDto.getEmail() );
        }
        if ( userDto.getFirstName() != null ) {
            user.setFirstName( userDto.getFirstName() );
        }
        if ( userDto.getImage() != null ) {
            user.setImage( userDto.getImage() );
        }
        if ( userDto.getLastName() != null ) {
            user.setLastName( userDto.getLastName() );
        }
        if ( userDto.getPhoneNumber() != null ) {
            user.setPhoneNumber( userDto.getPhoneNumber() );
        }
        if ( userDto.getRole() != null ) {
            user.setRole( userDto.getRole() );
        }
    }
}
