package com.fDiary.server.oauth.repository;

import com.fDiary.server.oauth.model.MemberBodyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberBodyInfoRepository extends JpaRepository<MemberBodyInfo, Long> {
}
