package com.fDiary.server.diray.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportDto {
    public int great = 0;
    public int careful = 0;
    public int bad = 0;
    public Double totalCalories;
    public Double maxCalories;
    public Double tan;
    public Double dan;
    public Double ji;
    public Double wantTan;
    public Double wantDan;
    public Double wantJi;

}
