import Image from "next/image";
import { P } from "./ui";
export function ApprovedNov28() { return <>
<figure className="my-8"><Image width={1200} height={1200} className="h-auto w-full" src={"/images/guides/nov28-thumb-v01.png"} alt={"AX 전환, 주간 보고서의 숫자가 서로 다르면 무엇부터 맞출까요? · 대표 이미지"}/></figure>
<P>{"영업팀은 주문일, 운영팀은 출고일을 기준으로 주간 실적을 냅니다. 금요일 주문이 월요일에 출고되면 두 표가 달라집니다. AI로 보고서를 요약해도 이 차이는 그대로 남습니다."}</P>
<figure className="my-8"><Image width={1200} height={1200} className="h-auto w-full" src={"/images/guides/nov28-a-v01.png"} alt={"AX 전환, 주간 보고서의 숫자가 서로 다르면 무엇부터 맞출까요? · 업무 상황"}/></figure>
<P>{"보고서에 쓸 지표 하나를 골라 포함 날짜와 취소 반영 시점, 원본 시스템을 적습니다. 금요일 주문 후 월요일 출고한 예시를 넣고 어느 주에 포함되는지 담당자와 합의합니다."}</P>
<figure className="my-8"><Image width={1200} height={1200} className="h-auto w-full" src={"/images/guides/nov28-b-v01.png"} alt={"AX 전환, 주간 보고서의 숫자가 서로 다르면 무엇부터 맞출까요? · 확인 방법"}/></figure>
<P>{"집계에는 합의한 규칙을 적용하고 요약 초안에는 기준 기간과 원본 표를 함께 표시합니다. 담당자는 전주 대비 변동 설명이 실제 표에서 확인되는지 보고 공유합니다. 기준이 바뀌면 적용일을 남겨 다음 보고서에서도 같은 뜻으로 읽히게 합니다."}</P>
<P>{"우리 팀의 주간 실적은 주문일과 출고일 중 어느 날짜를 쓰나요?"}</P>
</>; }