package com.clubflow.service;

import com.clubflow.dto.mapper.WorkshopRequestMapper;
import com.clubflow.dto.request.WorkshopRequestDto;
import com.clubflow.exception.ResourceNotFoundException;
import com.clubflow.model.User;
import com.clubflow.model.WorkshopRequest;
import com.clubflow.repository.UserRepository;
import com.clubflow.repository.WorkshopRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WorkshopRequestService {
    private static final Logger logger = LoggerFactory.getLogger(WorkshopRequestService.class);

    private final WorkshopRequestRepository workshopRequestRepository;
    private final UserRepository userRepository;
    private final WorkshopRequestMapper workshopRequestMapper;

    public WorkshopRequestService(WorkshopRequestRepository workshopRequestRepository,
                                   UserRepository userRepository,
                                   WorkshopRequestMapper workshopRequestMapper) {
        this.workshopRequestRepository = workshopRequestRepository;
        this.userRepository = userRepository;
        this.workshopRequestMapper = workshopRequestMapper;
    }

    public List<WorkshopRequest> getAllWorkshopRequests() {
        return workshopRequestRepository.findAll();
    }

    public WorkshopRequest getWorkshopRequestById(Long id) {
        return workshopRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("WorkshopRequest", "id", id));
    }

    public List<WorkshopRequest> getWorkshopRequestsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return workshopRequestRepository.findByUser(user);
    }

    public List<WorkshopRequest> getWorkshopRequestsByStatus(WorkshopRequest.RequestStatus status) {
        return workshopRequestRepository.findByStatus(status);
    }

    @Transactional
    public WorkshopRequest createWorkshopRequest(Long userId, WorkshopRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        WorkshopRequest workshopRequest = workshopRequestMapper.toEntity(dto, user);
        workshopRequest.setUser(user);
        workshopRequest.setStatus(WorkshopRequest.RequestStatus.PENDING);

        WorkshopRequest savedRequest = workshopRequestRepository.save(workshopRequest);
        logger.info("Workshop request created successfully: {}", savedRequest.getTitle());
        return savedRequest;
    }

    @Transactional
    public WorkshopRequest updateWorkshopRequestStatus(Long id, WorkshopRequest.RequestStatus status, String rejectionReason) {
        WorkshopRequest workshopRequest = workshopRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("WorkshopRequest", "id", id));

        workshopRequest.setStatus(status);
        if (status == WorkshopRequest.RequestStatus.REJECTED && rejectionReason != null) {
            workshopRequest.setRejectionReason(rejectionReason);
        }

        return workshopRequestRepository.save(workshopRequest);
    }

    @Transactional
    public void deleteWorkshopRequest(Long id) {
        WorkshopRequest workshopRequest = workshopRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("WorkshopRequest", "id", id));
        workshopRequestRepository.delete(workshopRequest);
        logger.info("Workshop request deleted: {}", id);
    }
}
