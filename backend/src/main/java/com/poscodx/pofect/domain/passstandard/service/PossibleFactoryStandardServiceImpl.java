package com.poscodx.pofect.domain.passstandard.service;

import com.poscodx.pofect.domain.essentialstandard.dto.EssentialStandardBtiPosReqDto;
import com.poscodx.pofect.domain.etc.controller.AlertController;
import com.poscodx.pofect.domain.etc.controller.SseController;
import com.poscodx.pofect.domain.etc.controller.SseEmitters;
import com.poscodx.pofect.domain.passstandard.dto.PossibleChangeReqDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleChangeResultResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleFactoryStandardResDto;
import com.poscodx.pofect.domain.passstandard.dto.PossibleToConfirmResDto;
import com.poscodx.pofect.domain.passstandard.entity.PossibleFactoryStandard;
import com.poscodx.pofect.domain.passstandard.repository.PossibleFactoryStandardRepository;
import com.poscodx.pofect.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.poscodx.pofect.domain.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PossibleFactoryStandardServiceImpl implements PossibleFactoryStandardService {
    @Autowired
    private SseController sseController;
    private PossibleFactoryStandardRepository possibleFactoryStandardRepository;
    private final SseEmitters sseEmitters;
    private final UserService userService;

    @Autowired
    public PossibleFactoryStandardServiceImpl(PossibleFactoryStandardRepository possibleFactoryStandardRepository, SseEmitters sseEmitters, UserService userService) {
        this.possibleFactoryStandardRepository = possibleFactoryStandardRepository;
        this.sseEmitters = sseEmitters;
        this.userService = userService;
    }


    @Override
    public List<PossibleFactoryStandardResDto> getGridData() {
        return possibleFactoryStandardRepository.getGridData().stream()
                .map(PossibleFactoryStandardResDto::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PossibleToConfirmResDto> possibleToConfirm(List<EssentialStandardBtiPosReqDto> essentialStandardBtiPosReqDtoList){
        List<PossibleToConfirmResDto> result=new ArrayList<>();
        for(EssentialStandardBtiPosReqDto d:essentialStandardBtiPosReqDtoList){
            List<PossibleToConfirmResDto> list=new ArrayList<>();
            System.out.println(d.getProcessCD()+", "+d.getBtiPosbPsFacTpList());
            HashSet<String> firmPsFacTp = new HashSet<>(); //hash로 공장값 저장 (중복X)
            PossibleToConfirmResDto.PossibleToConfirmResDtoBuilder builder = PossibleToConfirmResDto.builder();
            // processCD 설정
            builder.processCD(d.getProcessCD());
            for(String btiPosbPsFacTp:d.getBtiPosbPsFacTpList()){
                // PossibleFactoryStandardResDto를 생성하고 processCD와 firmPsFacTp를 설정
                //query를 통해 해당 공장 반환
                String getPossibleToConfirm = possibleFactoryStandardRepository.getPossibleToConfirm(d.getProcessCD(),btiPosbPsFacTp);
                if(getPossibleToConfirm!=null) {
                    for (String f : getPossibleToConfirm.split("")) {
                        System.out.print(f + " ");
                        firmPsFacTp.add(f);
                    }
                    builder.firmPsFacTpList(new ArrayList<>(firmPsFacTp));
                }
            }
            // 리스트에 PossibleToConfirmResDto 객체 추가
            result.add(builder.build());
        }
        return  result;
    }

    @Override
    public String getPosbCode(String processCd, String group) {
        Optional<PossibleFactoryStandard> result =
                possibleFactoryStandardRepository.findByProcessCdAndFeasibleRoutingGroup(processCd, group);

        if(result.isPresent()) {
            return result.get().getBtiPosbPsFacTp();
        }
        else return "0";
    }

    @Override
    @Transactional
    public PossibleChangeResultResDto updateFeasibleRoutingGroup(PossibleChangeReqDto checkedFactory, HttpServletRequest request){
        String btiPosbPsFacTp= checkedFactory.getBtiPosbPsFacTp();
        String processCd = checkedFactory.getProcessCd();
        String checkedList = checkedFactory.getCheckedList();
        String checkedExpl = checkedFactory.getCheckedExpl();
        SseEmitter alert = new SseEmitter(60*1000L);

        System.out.println("checkedList = "+checkedList+", expl = "+checkedExpl);
        PossibleChangeResultResDto result =new PossibleChangeResultResDto();
        int exist = possibleFactoryStandardRepository.checklistExist(btiPosbPsFacTp,processCd);
        if(exist>0&&checkedList.length()>0){//이미 존재하는 기준 변경
            //내용 변경 전, 똑같은 공장코드를 가진 code가 있는 지 유효성검사
            int sameCount = possibleFactoryStandardRepository.checkFeasibleRoutingGroupSame(processCd,checkedList);
            System.out.println(">> sameCount = "+sameCount);
            if(sameCount==0){
                possibleFactoryStandardRepository.updateFeasibleRoutingGroup(btiPosbPsFacTp,processCd,checkedList);
                result.setResult("Update");
                sseController.sendAlert("pass-standard","Update");
                //알람보내기
                SseEmitter emitter = new SseEmitter();
                userService.sendMailService("cheerup313@naver.com","가능 통과 공장 기준","수정","pass-standard",request);
                userService.sendMailService("chemi0313@gmail.com","가능 통과 공장 기준","수정","pass-standard",request);

            }else{
                result.setResult("Fail");
            }
        } else if (exist>0) { //이미 존재하는 기준이지만, 체크값 아예 X
            int deletedCount = possibleFactoryStandardRepository.deleteFeasibleRoutingGroup(btiPosbPsFacTp,processCd);
            System.out.println("삭제된 내용 있을 때 >>"+deletedCount);
            result.setResult("Delete");
            sseController.sendAlert("pass-standard","Delete");
            userService.sendMailService("cheerup313@naver.com","가능 통과 공장 기준","삭제","pass-standard",request);
            userService.sendMailService("chemi0313@gmail.com","가능 통과 공장 기준","삭제","pass-standard",request);

        }else{//현재 존재하지 않는 값을 insert
            int sameCount = possibleFactoryStandardRepository.checkFeasibleRoutingGroupSame(processCd,checkedList);
            System.out.println(">> sameCount = "+sameCount);
            if(sameCount==0){
                int insertCount = possibleFactoryStandardRepository.insertFeasibleRoutingGroup(btiPosbPsFacTp,processCd,checkedList,checkedExpl);
                if(insertCount>0) result.setResult("Insert");
                sseController.sendAlert("pass-standard","Insert");
                userService.sendMailService("cheerup313@naver.com","가능 통과 공장 기준","추가","pass-standard",request);
                userService.sendMailService("chemi0313@gmail.com","가능 통과 공장 기준","추가","pass-standard",request);
            }else{
                result.setResult("Fail");
            }
        }
        return result;
    };

}
