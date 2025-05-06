package com.clubflow.dto.mapper;

import com.clubflow.dto.request.BusRequestDto;
import com.clubflow.model.BusRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T14:17:19+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class BusRequestMapperImpl implements BusRequestMapper {

    @Override
    public BusRequest toEntity(BusRequestDto busRequestDto) {
        if ( busRequestDto == null ) {
            return null;
        }

        BusRequest busRequest = new BusRequest();

        busRequest.setAdditionalNotes( busRequestDto.getAdditionalNotes() );
        busRequest.setDepartureDate( busRequestDto.getDepartureDate() );
        busRequest.setDestination( busRequestDto.getDestination() );
        busRequest.setNumberOfPassengers( busRequestDto.getNumberOfPassengers() );
        busRequest.setPurpose( busRequestDto.getPurpose() );
        busRequest.setReturnDate( busRequestDto.getReturnDate() );

        return busRequest;
    }

    @Override
    public BusRequestDto toDto(BusRequest busRequest) {
        if ( busRequest == null ) {
            return null;
        }

        BusRequestDto busRequestDto = new BusRequestDto();

        busRequestDto.setAdditionalNotes( busRequest.getAdditionalNotes() );
        busRequestDto.setDepartureDate( busRequest.getDepartureDate() );
        busRequestDto.setDestination( busRequest.getDestination() );
        busRequestDto.setNumberOfPassengers( busRequest.getNumberOfPassengers() );
        busRequestDto.setPurpose( busRequest.getPurpose() );
        busRequestDto.setReturnDate( busRequest.getReturnDate() );

        return busRequestDto;
    }

    @Override
    public void updateEntity(BusRequestDto busRequestDto, BusRequest busRequest) {
        if ( busRequestDto == null ) {
            return;
        }

        if ( busRequestDto.getAdditionalNotes() != null ) {
            busRequest.setAdditionalNotes( busRequestDto.getAdditionalNotes() );
        }
        if ( busRequestDto.getDepartureDate() != null ) {
            busRequest.setDepartureDate( busRequestDto.getDepartureDate() );
        }
        if ( busRequestDto.getDestination() != null ) {
            busRequest.setDestination( busRequestDto.getDestination() );
        }
        if ( busRequestDto.getNumberOfPassengers() != null ) {
            busRequest.setNumberOfPassengers( busRequestDto.getNumberOfPassengers() );
        }
        if ( busRequestDto.getPurpose() != null ) {
            busRequest.setPurpose( busRequestDto.getPurpose() );
        }
        if ( busRequestDto.getReturnDate() != null ) {
            busRequest.setReturnDate( busRequestDto.getReturnDate() );
        }
    }
}
