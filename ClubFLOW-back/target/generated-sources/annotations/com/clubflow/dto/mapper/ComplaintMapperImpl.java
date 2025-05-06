package com.clubflow.dto.mapper;

import com.clubflow.dto.request.ComplaintDto;
import com.clubflow.model.Complaint;
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
public class ComplaintMapperImpl implements ComplaintMapper {

    @Override
    public Complaint toEntity(ComplaintDto complaintDto) {
        if ( complaintDto == null ) {
            return null;
        }

        Complaint complaint = new Complaint();

        complaint.setClub( complaintDto.getClub() );
        complaint.setMessage( complaintDto.getMessage() );
        complaint.setSubject( complaintDto.getSubject() );

        complaint.setDate( LocalDate.parse(complaintDto.getDate()) );

        return complaint;
    }

    @Override
    public ComplaintDto toDto(Complaint complaint) {
        if ( complaint == null ) {
            return null;
        }

        ComplaintDto complaintDto = new ComplaintDto();

        complaintDto.setClub( complaint.getClub() );
        complaintDto.setMessage( complaint.getMessage() );
        complaintDto.setSubject( complaint.getSubject() );

        complaintDto.setDate( complaint.getDate().toString() );

        return complaintDto;
    }

    @Override
    public void updateEntity(ComplaintDto complaintDto, Complaint complaint) {
        if ( complaintDto == null ) {
            return;
        }

        if ( complaintDto.getClub() != null ) {
            complaint.setClub( complaintDto.getClub() );
        }
        if ( complaintDto.getMessage() != null ) {
            complaint.setMessage( complaintDto.getMessage() );
        }
        if ( complaintDto.getSubject() != null ) {
            complaint.setSubject( complaintDto.getSubject() );
        }

        complaint.setDate( LocalDate.parse(complaintDto.getDate()) );
    }
}
