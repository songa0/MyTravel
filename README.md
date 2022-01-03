### 나만의 여행지  
여행지와 여행지에서 느낀 오감을 기록한다.   
URL : https://my-travel-diary.netlify.app/  
<br/>

**1. 프로젝트 설명**
 - Google/Github 계정으로 로그인한다.
 - 로그인 후 메인 화면의 오른쪽 하단 버튼을 눌러 여행지 기록을 추가한다.
 - 팝업에 여행지의 기본 정보 및 다섯 가지 감각을 통해 느낀 것들을 기록한다.
 - 등록한 여행지를 카드 형식으로 볼 수 있다.
 - 검색 창에 제목으로 검색할 수 있다. 
 - 검색 창 밑의 태그를 클릭하면 연관된 여행지 목록을 볼 수 있다.
 - 카드 위에 마우스를 올리면 Info, Delete 버튼이 나타난다.
 - Info를 누르면 여행지의 상세 기록 내용을 볼 수 있다.
 - 상세 기록 페이지에서 정보 수정이 가능하다.
 - Delete를 누르면 여행지 기록이 삭제된다.
<br/>

**2. 완성본**
  
<img src="https://user-images.githubusercontent.com/17793440/131830778-e342d06f-097c-4772-a999-a2676db5be3d.png" width="950px"/>
<img src="https://user-images.githubusercontent.com/17793440/131830960-fe04ea8d-8c4d-42be-8a8a-f5cba06fd276.png" width="960px"/>
<br/>
  
**3. 보완할 점**  
 **기능**  
 - 여러 개의 첨부파일 저장하는 기능 추가 (완료)
 - 첨부파일을 슬라이드 형식으로 보는 기능 추가(완료) -> radio 버튼 css 수정 
 - 첨부파일 수정(재첨부, 삭제) 기능 추가 (진행중)
 - 무한 스크롤 추가 (throttle 사용)    
 - 다른 유저와 여행지 정보/오감을 공유할 수 있는 기능 추가    
 **기술**  
 - redux 적용  
 - typescript 적용  
<br/>
  
**4. 한계**  
 - 백엔드 구현없이 firebase realtime db를 사용하다보니, 검색 기능이 정교하지 않다.  
   검색 시, 텍스트의 앞부분이 일치하는 것만 반환한다.  
 - 사진 업로드 소요 시간이 길다.
<br/>
     
**5. 프로젝트를 통해 알게된 것**
  - jsx에서는 forEach 쓰면 아무것도 리턴하지 않는다.   
    -> 대신 map 함수를 써야한다. forEach의 경우 아무것도 리턴하지 않지만 map 함수는 결과를 리턴한다.  
  - set -> array 만들때는 Array.from 함수를 사용한다.  
  - className을 여러 개 등록할 때는 배열로 만든 후 join 함수를 사용한다. ex) [a, b].join(' ')
  - Netlify 배포 후에 Firebase API를 사용하기 위해서는 Netlify에 API Key를 등록한다.



