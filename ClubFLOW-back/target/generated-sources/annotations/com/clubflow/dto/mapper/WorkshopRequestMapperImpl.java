package com.clubflow.dto.mapper;

import com.clubflow.dto.request.WorkshopRequestDto;
import com.clubflow.model.User;
import com.clubflow.model.WorkshopRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T22:02:03+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class WorkshopRequestMapperImpl implements WorkshopRequestMapper {

    @Override
    public WorkshopRequest toEntity(WorkshopRequestDto dto, User user) {
        if ( dto == null && user == null ) {
            return null;
        }

        WorkshopRequest workshopRequest = new WorkshopRequest();

        if ( dto != null ) {
            workshopRequest.setReason( dto.getReason() );
            workshopRequest.setTitle( dto.getTitle() );
        }
        if ( user != null ) {
            workshopRequest.setUser( user );
            workshopRequest.setCreatedAt( user.getCreatedAt() );
            workshopRequest.setId( user.getId() );
            workshopRequest.setUpdatedAt( user.getUpdatedAt() );
        }

        return workshopRequest;
    }

    @Override
    public WorkshopRequestDto toDto(WorkshopRequest entity) {
        if ( entity == null ) {
            return null;
        }

        WorkshopRequestDto workshopRequestDto = new WorkshopRequestDto();

        workshopRequestDto.setUserId( entityUserId( entity ) );
        workshopRequestDto.setReason( entity.getReason() );
        workshopRequestDto.setTitle( entity.getTitle() );

        return workshopRequestDto;
    }

    private Long entityUserId(WorkshopRequest workshopRequest) {
        if ( workshopRequest == null ) {
            return null;
        }
        User user = workshopRequest.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
