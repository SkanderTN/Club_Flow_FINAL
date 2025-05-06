package com.clubflow.dto.mapper;

import com.clubflow.dto.request.RoomRequestDto;
import com.clubflow.model.RoomRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T14:17:19+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class RoomRequestMapperImpl implements RoomRequestMapper {

    @Override
    public RoomRequest toEntity(RoomRequestDto roomRequestDto) {
        if ( roomRequestDto == null ) {
            return null;
        }

        RoomRequest roomRequest = new RoomRequest();

        roomRequest.setBuilding( roomRequestDto.getBuilding() );
        roomRequest.setDate( roomRequestDto.getDate() );
        roomRequest.setDuration( roomRequestDto.getDuration() );
        roomRequest.setPurpose( roomRequestDto.getPurpose() );
        roomRequest.setRoomNumber( roomRequestDto.getRoomNumber() );
        roomRequest.setStartTime( roomRequestDto.getStartTime() );

        return roomRequest;
    }

    @Override
    public RoomRequestDto toDto(RoomRequest roomRequest) {
        if ( roomRequest == null ) {
            return null;
        }

        RoomRequestDto roomRequestDto = new RoomRequestDto();

        roomRequestDto.setBuilding( roomRequest.getBuilding() );
        roomRequestDto.setDate( roomRequest.getDate() );
        roomRequestDto.setDuration( roomRequest.getDuration() );
        roomRequestDto.setPurpose( roomRequest.getPurpose() );
        roomRequestDto.setRoomNumber( roomRequest.getRoomNumber() );
        roomRequestDto.setStartTime( roomRequest.getStartTime() );

        return roomRequestDto;
    }

    @Override
    public void updateEntity(RoomRequestDto roomRequestDto, RoomRequest roomRequest) {
        if ( roomRequestDto == null ) {
            return;
        }

        if ( roomRequestDto.getBuilding() != null ) {
            roomRequest.setBuilding( roomRequestDto.getBuilding() );
        }
        if ( roomRequestDto.getDate() != null ) {
            roomRequest.setDate( roomRequestDto.getDate() );
        }
        if ( roomRequestDto.getDuration() != null ) {
            roomRequest.setDuration( roomRequestDto.getDuration() );
        }
        if ( roomRequestDto.getPurpose() != null ) {
            roomRequest.setPurpose( roomRequestDto.getPurpose() );
        }
        if ( roomRequestDto.getRoomNumber() != null ) {
            roomRequest.setRoomNumber( roomRequestDto.getRoomNumber() );
        }
        if ( roomRequestDto.getStartTime() != null ) {
            roomRequest.setStartTime( roomRequestDto.getStartTime() );
        }
    }
}
