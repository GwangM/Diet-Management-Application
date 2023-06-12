package com.fDiary.server.diray.service;

import com.fDiary.server.diray.model.dto.*;
import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.DiaryImage;
import com.fDiary.server.diray.model.entity.Food;
import com.fDiary.server.diray.model.type.DiaryGrade;
import com.fDiary.server.diray.model.type.MealTime;
import com.fDiary.server.diray.reppository.*;
import com.fDiary.server.oauth.model.ImageDTO;
import com.fDiary.server.oauth.model.Member;
import com.fDiary.server.oauth.model.MemberBodyInfo;
import com.fDiary.server.oauth.model.MemberStrategy;
import com.fDiary.server.oauth.repository.MemberRepository;
import com.fDiary.server.util.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final FoodRepository foodRepository;
    private final DiaryImageRepository diaryImageRepository;
    private final MemberRepository memberRepository;
    private final DiaryMapper diaryMapper;
    private final FileService fileService;
    private final DiaryMybatisMapper diaryMybatisMapper;

    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    public Long writeDiary(String userId, DiaryWriteDTO diaryWriteDTO) {
        Member member = memberRepository.findByUserId(userId).get();
        Diary diary = diaryMapper.diaryWriteDTOToDiary(diaryWriteDTO);
        MemberStrategy strategy = member.getStrategy();

        switch (diaryWriteDTO.getMealTime()) {
            case ("아침") -> diary.setMealTime(MealTime.Breakfast);
            case ("점심") -> diary.setMealTime(MealTime.Lunch);
            case ("저녁") -> diary.setMealTime(MealTime.Dinner);
            case ("간식") -> diary.setMealTime(MealTime.Snack);
        }
        diary.setDiaryGrade(calcDiaryGrade(diaryWriteDTO,strategy));
        diaryRepository.save(diary);
        List<Food> foodList = new ArrayList<>();
        for (FoodDto dto : diaryWriteDTO.getFoods()) {
            foodList.add(Food.dtoToFood(dto, diary));
        }
        foodRepository.saveAll(foodList);
        diary.setFoods(foodList);
        diary.setMember(member);
        diaryRepository.save(diary);
        return diary.getDiaryId();
    }

    private DiaryGrade calcDiaryGrade(DiaryWriteDTO diaryWriteDTO, MemberStrategy strategy) {
        List<FoodDto> foods = diaryWriteDTO.getFoods();
        double tan = 0;
        double dan = 0;
        double ji = 0;

        for(FoodDto el : foods){
            tan += Double.parseDouble(el.getTan());
            dan += Double.parseDouble(el.getDan());
            ji += Double.parseDouble(el.getJi());
        }

        if (strategy == MemberStrategy.DIET) {

        } else if (strategy == MemberStrategy.HDAN) {

        } else if (strategy == MemberStrategy.LTANHJI) {

        } else if (strategy == MemberStrategy.NORMAL) {

        }
        return null;
    }

    private Map<String, String> resultMessage() {
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }

    protected DiaryImage saveDiaryImage(MultipartFile file, Diary diary) {
        String originalName = file.getOriginalFilename();
        Path root = Paths.get(uploadPath + "/diaryImage");
        try {
            assert originalName != null;
            ImageDTO imageDTO = fileService.createImageDTO(originalName, root);
            DiaryImage diaryImage = DiaryImage.builder()
                    .uuid(imageDTO.getUuid())
                    .fileName(imageDTO.getFileName())
                    .fileUrl(imageDTO.getFileUrl())
                    .diary(diary)
                    .build();
            file.transferTo(Paths.get(imageDTO.getFileUrl()));
            return diaryImageRepository.save(diaryImage);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public DiaryReadDTO readDateDiary(String date, String userId) throws FileNotFoundException {
        Member member = memberRepository.findByUserId(userId).get();
        List<Diary> diaries = diaryRepository.findAllByWriteDateAndMember(date, member);
        boolean[] mealTimes = new boolean[4];
        for (Diary diary : diaries) {
            MealTime mealTime = diary.getMealTime();
            switch (mealTime.name()) {
                case "Breakfast" -> mealTimes[0] = true;
                case "Lunch" -> mealTimes[1] = true;
                case "Dinner" -> mealTimes[2] = true;
                case "Snack" -> mealTimes[3] = true;
            }
        }
        return DiaryReadDTO.builder()
                .diaries(DiaryDTO.toDiary(diaries))
                .diaryExist(mealTimes)
                .build();
    }

    public void fileUpload(Long diaryId, MultipartFile input) {
        Diary diary = diaryRepository.findById(diaryId).get();
        System.out.println(input.isEmpty());
        DiaryImage diaryImage = saveDiaryImage(input, diary);
        diary.setDiaryImage(diaryImage);
        diaryRepository.save(diary);
    }

    public void deleteDiary(String diaryId) {
        Diary diary =  diaryRepository.findById(Long.valueOf(diaryId)).orElseThrow();
        diaryRepository.delete(diary);
    }

    public void getWeeklyReport(String userId) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("토큰 정보와 일치하는 사용자가 없습니다."));
        LocalDateTime cur = LocalDateTime.now();
        LocalDateTime startDateTime = cur.minusDays(cur.getDayOfWeek().getValue() - 1);
        String today = cur.toString().split("T")[0];
        String startDate = startDateTime.toString().split("T")[0];
        List<Diary> diaries = diaryMybatisMapper.selectThisWeekDiaries(member.getId(), startDate, today);
        // diary 타입에 따른 계산식 만들어야함. 상태정보를 가져와야하기 때문
        ReportDto dto = getReportDto(member,diaries);


    }

    private ReportDto getReportDto(Member member, List<Diary> diaries) {
        ReportDto dto = new ReportDto();
        double maxCalories = calcMaxCalories(member.getMemberBodyInfo());
        dto.setMaxCalories(maxCalories);
        double tan = 0;
        double dan = 0;
        double ji = 0;

        for (Diary diary : diaries) {
            switch (diary.getDiaryGrade().name()) {
                case "BAD" -> dto.setBad(dto.getBad() + 1);
                case "GREAT" -> dto.setGreat(dto.getGreat() + 1);
                case "CAREFUL" -> dto.setCareful(dto.getCareful() + 1);
            }
            List<Food> foods =  diary.getFoods();
            for(Food el : foods){
                tan += Double.parseDouble(el.getTan());
                dan += Double.parseDouble(el.getDan());
                ji += Double.parseDouble(el.getJi());
            }
        }
        dto.setTotalCalories( tan * 4 + dan *4 + ji *9);
        switch (member.getStrategy().getStrategy()) {
            case "저탄고지" -> {
                dto.setWantTan(maxCalories / 40);
                dto.setWantDan(maxCalories / 20);
                dto.setWantJi((maxCalories * 7) / 90);
            }
            case "고단백" -> {
                dto.setWantTan(maxCalories / 10);
                dto.setWantDan(maxCalories / 10);
                dto.setWantJi(maxCalories / 45);
            }
            case "일반식" -> {
                dto.setWantTan(maxCalories / 8);
                dto.setWantDan(maxCalories / 20);
                dto.setWantJi(maxCalories / 30);
            }
            case "다이어트식" -> {
                dto.setWantTan(maxCalories / 8);
                dto.setWantDan((maxCalories * 3) / 40);
                dto.setWantJi(maxCalories / 45);
            }
            default -> throw new IllegalStateException("Unexpected value: " + member.getStrategy().getStrategy());
        }
        return dto;
    }

    private double calcMaxCalories(MemberBodyInfo memberBodyInfo) {
        return 66 + 13.7* Double.parseDouble(memberBodyInfo.getWeight())
                + 5 * Double.parseDouble(memberBodyInfo.getHeight())
                - 6.8 * Double.parseDouble(memberBodyInfo.getAge());
    }
}
