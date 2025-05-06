package com.clubflow.repository;

import com.clubflow.model.User;
import com.clubflow.model.WorkshopRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkshopRequestRepository extends JpaRepository<WorkshopRequest, Long> {
    List<WorkshopRequest> findByUser(User user);
    List<WorkshopRequest> findByStatus(WorkshopRequest.RequestStatus status);
    List<WorkshopRequest> findByUserAndStatus(User user, WorkshopRequest.RequestStatus status);
}
