package com.clubflow.dto.mapper;

import com.clubflow.dto.request.GuideDto;
import com.clubflow.model.Guide;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-06T14:17:18+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class GuideMapperImpl implements GuideMapper {

    @Override
    public Guide toEntity(GuideDto guideDto) {
        if ( guideDto == null ) {
            return null;
        }

        Guide guide = new Guide();

        guide.setClub( guideDto.getClub() );
        guide.setDescription( guideDto.getDescription() );
        guide.setLink( guideDto.getLink() );
        guide.setTitle( guideDto.getTitle() );

        return guide;
    }

    @Override
    public GuideDto toDto(Guide guide) {
        if ( guide == null ) {
            return null;
        }

        GuideDto guideDto = new GuideDto();

        guideDto.setClub( guide.getClub() );
        guideDto.setDescription( guide.getDescription() );
        guideDto.setLink( guide.getLink() );
        guideDto.setTitle( guide.getTitle() );

        return guideDto;
    }

    @Override
    public void updateEntity(GuideDto guideDto, Guide guide) {
        if ( guideDto == null ) {
            return;
        }

        if ( guideDto.getClub() != null ) {
            guide.setClub( guideDto.getClub() );
        }
        if ( guideDto.getDescription() != null ) {
            guide.setDescription( guideDto.getDescription() );
        }
        if ( guideDto.getLink() != null ) {
            guide.setLink( guideDto.getLink() );
        }
        if ( guideDto.getTitle() != null ) {
            guide.setTitle( guideDto.getTitle() );
        }
    }
}
