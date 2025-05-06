package com.clubflow.dto.mapper;

import com.clubflow.dto.request.EventDto;
import com.clubflow.model.Event;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T22:24:19+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class EventMapperImpl implements EventMapper {

    @Override
    public Event toEntity(EventDto eventDto) {
        if ( eventDto == null ) {
            return null;
        }

        Event event = new Event();

        event.setClub( eventDto.getClub() );
        event.setDate( eventDto.getDate() );
        event.setDescription( eventDto.getDescription() );
        event.setLocation( eventDto.getLocation() );
        event.setTime( eventDto.getTime() );
        event.setTitle( eventDto.getTitle() );
        event.setType( eventDto.getType() );

        return event;
    }

    @Override
    public EventDto toDto(Event event) {
        if ( event == null ) {
            return null;
        }

        EventDto eventDto = new EventDto();

        eventDto.setClub( event.getClub() );
        eventDto.setDate( event.getDate() );
        eventDto.setDescription( event.getDescription() );
        eventDto.setLocation( event.getLocation() );
        eventDto.setTime( event.getTime() );
        eventDto.setTitle( event.getTitle() );
        eventDto.setType( event.getType() );

        return eventDto;
    }

    @Override
    public void updateEntity(EventDto eventDto, Event event) {
        if ( eventDto == null ) {
            return;
        }

        if ( eventDto.getClub() != null ) {
            event.setClub( eventDto.getClub() );
        }
        if ( eventDto.getDate() != null ) {
            event.setDate( eventDto.getDate() );
        }
        if ( eventDto.getDescription() != null ) {
            event.setDescription( eventDto.getDescription() );
        }
        if ( eventDto.getLocation() != null ) {
            event.setLocation( eventDto.getLocation() );
        }
        if ( eventDto.getTime() != null ) {
            event.setTime( eventDto.getTime() );
        }
        if ( eventDto.getTitle() != null ) {
            event.setTitle( eventDto.getTitle() );
        }
        if ( eventDto.getType() != null ) {
            event.setType( eventDto.getType() );
        }
    }
}
