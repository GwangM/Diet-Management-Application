package com.fDiary.server.oauth.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BodyInfoDto {
    private String height;
    private String weight;
    private String age;

}
