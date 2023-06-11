# Graduation Project
# 머신러닝 API를 활용한 식단 관리 애플리케이션 개발
Development of diet management application using machine learning API(영문)  

## Student
* 주광명(2017104030, rhkdaud268@khu.ac.kr)  

## Overview
최근 스마트폰을 사용하는 사람들이 크게 증가함에 따라 모바일 환경에서 쉽게 접근할 수 있는 식단 관리 애플리케이션을 구현하고자 한다. 그리고 식단을 관리함에 있어서 지도를 활용한 기능을 제공하는 식단 관리 애플리케이션은 제공되지 않았다. 따라서 본 연구에서는 머신러닝 기반 API와 지도 기능을 활용하여 사용자에게 편의성을 줄 수 있는 식단 관리 애플리케이션을 제공하고자 한다.

## Motivation
현대인들은 영양적으로 균형 잡히지 못한 식사로 인하여 비만이나 영양결핍을 겪는 경우가 많다. 그런 이유로 최근 현대 사회에는 자기 관리를 위해 식단 관리를 필요로 하는 사람들이 점점 늘어나고 있다. 그러한 사람들의 필요성에 맞추어 식단 관리 서비스를 제공하고자 한다. 그리고 사용자 경험 관점에서 모바일 환경으로서 제공하는 것이 접근성이 높으므로 식단 관리를 빠르고 편리하게 할 수 있도록 애플리케이션을 만들고자 한다. 또한 사용자의 현재 위치 정보에 맞추어 지도 화면을 보여주어 근처에 있는 식당과 근방에서 분석했던 음식 정보를 보여줄 것이다. 거기에 지역 검색 기능을 추가하여 근처의 식당 정보를 간단하게 확인할 수 있도록 할 것이다.
  
## Results  
로그인 화면  
![image](https://github.com/GwangM/Diet-Management-Application/assets/89342880/85e5e963-87ce-452a-a911-c635d36e6641)
달력 화면  
![image](https://github.com/GwangM/Diet-Management-Application/assets/89342880/dcddf5ef-343c-4fbe-b897-f2cc847f447f)
일별 관리 화면
![image](https://github.com/GwangM/Diet-Management-Application/assets/89342880/d7a63c25-7922-43f1-ad38-e433ba4ab4ab)
지도 화면 
![image](https://github.com/GwangM/Diet-Management-Application/assets/89342880/52d86152-a83a-4f9b-992a-2b38f577fb47)

음식 분석 화면 
![image](https://github.com/GwangM/Diet-Management-Application/assets/89342880/e10b932c-b3c5-47f7-988f-d5ff0ea67d33) 
지역 검색 화면
![image](https://github.com/GwangM/Diet-Management-Application/assets/89342880/7e9affe9-e3f5-44ab-8698-a3ed84f3d8cf)

## Conclusion
  음식 인식 API를 활용하여 음식 정보 추출, 식단 정보 관리 기능을 제공하는 식단 관리 애플리케이션을 구현하였다. 또한 OAuth2.0을 활용하여 편리하게 사용자 정보를 입력하는 기능을 적용하였다. 그럼으로써 사용자가 식단 관리를 빠르고 편리하게 할 수 있도록 하였다. 또한 현 위치 근방에 대한 지도 기능을 추가하였다. 기존의 지도 기능이 없었던 식단 관리 애플리케이션에 관련 기능을 추가하였고, 이를 통해 지도 정보로부터 음식 정보를 얻을 수 있게 하였다. 이러한 기능으로 인해 사용자 편의성을 증진해줄 것으로 기대된다. 향후 연구로는 식단 관리 애플리케이션에 있어서 사용자 편의성을 향상시킬 수 있는 방안들을 구상하고, 이에 필요한 추가 기능들을 구체화하여 연구할 계획이다.
  
## References
[1] 음식 인식 API : https://console.kakaoi.io/docs/posts/aiservice-vision/food-recognition/2022-06-27-aiservice-food-recognition_overview/aiservice-food-recognition_overview#음식-인식
[2] KHIN CHAN MYAE AUNG "Today’s MENU: 개인 맞춤형 건강 식단관리 추천 애플리케이션" 국내석사학위논문 부경대학교 2022.2 (2022).
[3] 권오득, 이현우, 김영아, 박두순 "스마트폰의 GPS를 이용한 음식점 추천 시스템" 한국정보처리학회 학술대회논문집 2012.4 (2012): 1330-1332.
[4] 김미정,김은경,김은하,최유진, 이성철. "지도 API와 데이터베이스를 활용한 반려동물 관리 애플리케이션." 한국정보처리학회 학술대회논문집 29.2 (2022): 676-678.
[5] https://developers.google.com/identity/protocols/oauth2?hl=ko

## Reports
[[주광명] 최종보고서.pdf](https://github.com/GwangM/Diet-Management-Application/files/11714735/default.pdf)
