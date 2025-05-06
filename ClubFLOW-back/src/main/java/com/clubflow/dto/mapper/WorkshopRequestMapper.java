package com.clubflow.dto.mapper;

import com.clubflow.dto.request.WorkshopRequestDto;
import com.clubflow.model.User;
import com.clubflow.model.WorkshopRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkshopRequestMapper {

    @Mapping(source = "user", target = "user")
    WorkshopRequest toEntity(WorkshopRequestDto dto, User user);

    @Mapping(source = "user.id", target = "userId")
    WorkshopRequestDto toDto(WorkshopRequest entity);
}
