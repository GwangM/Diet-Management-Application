package com.fDiary.server.oauth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberRequestDTO {

    private String userId;
    private String username;
    private String password;

    private String email;
    private String phoneNo;
    private MultipartFile memberImage;
}
