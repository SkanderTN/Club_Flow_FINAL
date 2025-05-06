package com.clubflow.dto.mapper;

import com.clubflow.dto.request.MaterialRequestDto;
import com.clubflow.model.MaterialRequest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T14:17:19+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class MaterialRequestMapperImpl implements MaterialRequestMapper {

    @Override
    public MaterialRequest toEntity(MaterialRequestDto materialRequestDto) {
        if ( materialRequestDto == null ) {
            return null;
        }

        MaterialRequest materialRequest = new MaterialRequest();

        materialRequest.setClub( materialRequestDto.getClub() );
        materialRequest.setName( materialRequestDto.getName() );
        materialRequest.setQuantity( materialRequestDto.getQuantity() );
        materialRequest.setReason( materialRequestDto.getReason() );

        materialRequest.setRequestedDate( LocalDate.parse(materialRequestDto.getRequestedDate()) );

        return materialRequest;
    }

    @Override
    public MaterialRequestDto toDto(MaterialRequest materialRequest) {
        if ( materialRequest == null ) {
            return null;
        }

        String techClub = null;
        String projector = null;
        int i = 0;
        LocalDate now = null;
        String presentationNeeds = null;

        MaterialRequestDto materialRequestDto = new MaterialRequestDto( techClub, projector, i, now, presentationNeeds );

        materialRequestDto.setClub( materialRequest.getClub() );
        materialRequestDto.setName( materialRequest.getName() );
        materialRequestDto.setQuantity( materialRequest.getQuantity() );
        materialRequestDto.setReason( materialRequest.getReason() );

        materialRequestDto.setRequestedDate( materialRequest.getRequestedDate().toString() );

        return materialRequestDto;
    }

    @Override
    public void updateEntity(MaterialRequestDto materialRequestDto, MaterialRequest materialRequest) {
        if ( materialRequestDto == null ) {
            return;
        }

        if ( materialRequestDto.getClub() != null ) {
            materialRequest.setClub( materialRequestDto.getClub() );
        }
        if ( materialRequestDto.getName() != null ) {
            materialRequest.setName( materialRequestDto.getName() );
        }
        if ( materialRequestDto.getQuantity() != null ) {
            materialRequest.setQuantity( materialRequestDto.getQuantity() );
        }
        if ( materialRequestDto.getReason() != null ) {
            materialRequest.setReason( materialRequestDto.getReason() );
        }

        materialRequest.setRequestedDate( LocalDate.parse(materialRequestDto.getRequestedDate()) );
    }
}
