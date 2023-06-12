package com.fDiary.server.diray.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryReadDTO {
    private boolean[] diaryExist;
    private List<DiaryDTO> diaries;
}
