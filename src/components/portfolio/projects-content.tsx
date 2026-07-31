"use client";

import { ReactNode } from "react";
import Mermaid from "./Mermaid";
import { MetaTable, SimpleTable, Bullets, SubTitle, Prose, Strong, Code } from "./ui";
import {
  sseChart,
  reactChart,
  voiceChart,
  qrPayChart,
  hexChart,
  netCancelChart,
  identityChart,
  reindexChart,
  migrationChart,
} from "./charts";

/* ---------- ① AI 프로덕션 백엔드 ---------- */

function AiBackendContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.03 ~ 2026.07 (진행 중)"],
          [
            "역할",
            <>
              AI 백엔드 서버 <Strong>단독 구축</Strong>(76/90 커밋) · 에이전트 아키텍처 전환 주도 ·
              음성 파이프라인 설계
            </>,
          ],
          [
            "스택",
            "Python 3.12, FastAPI, SQLAlchemy 2.0 async, MySQL, pgvector, OpenAI (GPT/Whisper/TTS), SSE, structlog, Sentry",
          ],
          ["구성", "AI 에이전트 서버 + 프록시/영속화 백엔드 + 음성 대화 모듈 + 테스트 콘솔(React)"],
        ]}
      />

      <SubTitle>시스템 구조 — 끊겨도 유실 없는 SSE 스트리밍</SubTitle>
      <Prose>
        모바일 앱과 AI 에이전트 사이에 <Strong>프록시 백엔드</Strong>를 두어, 스트리밍·영속화·관측성을
        한 곳에서 책임지도록 설계했습니다.
      </Prose>
      <Mermaid chart={sseChart} />
      <Bullets
        items={[
          <>
            업스트림 SSE를 <Strong>백그라운드 task + <Code>asyncio.Queue</Code></Strong>로 소비 →
            클라이언트 연결과 에이전트 응답 수명을 분리. 모바일 환경의 잦은 연결 끊김에도{" "}
            <Strong>메시지 유실 0</Strong>.
          </>,
          <>
            턴 단위 <Code>trace_id</Code> + <Code>request_id</Code> + <Code>user_id</Code>를
            contextvars로 자동 첨부하는 구조화 로깅 → <Code>ai_turn_logs</Code> 테이블에{" "}
            <Strong>TTFR(첫 응답)·TTFC(첫 청크) latency, intent, 에러</Strong>를 기록해 품질 리그레션
            추적.
          </>,
          <>
            구버전 앱이 깨지지 않도록 레거시 응답 스키마(30+ 필드)를 유지하며 신규 스키마로{" "}
            <Strong>무중단 이전</Strong>.
          </>,
        ]}
      />

      <SubTitle>AI 에이전트 — 자체 DAG에서 ReAct 툴 에이전트로</SubTitle>
      <Prose>
        프레임워크(LangGraph 등) 없이 구현된 추천 에이전트를, 서비스 중단 없이{" "}
        <Strong>Tool-calling 기반 ReAct 아키텍처로 단계적 전환</Strong>(Phase 1~4)했습니다.
      </Prose>
      <Mermaid chart={reactChart} />
      <Bullets
        items={[
          <>
            검색은 <Strong>DB-first RAG</Strong>: pgvector 임베딩 검색 → 결과 부족 시 OpenAI 웹검색
            폴백. 임베딩 빌드 배치 잡 별도 운영.
          </>,
          <>
            1차 액션의 신뢰도가 낮으면 상태를 deep-clone해 대체 라우트를 재실행하고 점수 마진으로
            우승작을 채택하는 <Strong>route-repair</Strong> 로직 구현.
          </>,
        ]}
      />

      <SubTitle>음성 대화 — STT/TTS 파이프라인</SubTitle>
      <Mermaid chart={voiceChart} />
      <Bullets
        items={[
          <>
            SSE 이벤트 프로토콜(<Code>stt_result</Code> → <Code>markdown_done</Code> →{" "}
            <Code>tts_summary</Code> …)을 직접 설계하고 Swagger로 문서화.
          </>,
          <>
            <Strong>STT 헐루시네이션</Strong>(무음 입력 시 Whisper가 임의 문장 생성) 감지 로직과 전용
            에러코드 도입 — 실전에서만 만나는 엣지케이스 대응.
          </>,
          <>TTS 실행 시점을 대화 저장 이후로 옮겨 실패 시에도 텍스트 대화는 보존되도록 순서 최적화.</>,
        ]}
      />

      <SubTitle>성과</SubTitle>
      <Bullets
        items={[
          <>
            AI 대화 기능을 <Strong>프로덕션 앱에 출시</Strong>하고 백엔드 전
            구간(인증·스트리밍·영속화·배포)을 단독 운영
          </>,
          <>
            질문셋 기반 <Strong>LLM 응답 자동 평가(QA) 모듈</Strong> 구축 → 프롬프트/모델 변경 시 품질
            리그레션 자동 검증
          </>,
          <>
            SSE 계약을 검증하는 <Strong>React 테스트 콘솔</Strong>까지 직접 제작(27/27 커밋) — 스트리밍
            렌더링 race 이슈를 프론트 단에서 진단·해결
          </>,
        ]}
      />
    </>
  );
}

/* ---------- ② 자체 간편결제 ---------- */

function PaymentsContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2025.04 ~ 2026.06"],
          [
            "역할",
            <>
              결제 서버 <Strong>최다 기여자</Strong>(85/107 커밋) — 온라인 PG 공통모듈 전체 구축, 자체
              QR 결제 고도화, 운영 인프라
            </>,
          ],
          [
            "스택",
            "Python, FastAPI, SQLModel, MySQL 8.0, jpype1(Java 연동), AES-256-CBC / Fernet / PBKDF2, Alembic, Docker",
          ],
          ["아키텍처", "헥사고날 (Ports & Adapters)"],
        ]}
      />

      <SubTitle>자체 페이 — 오프라인 QR 결제 흐름</SubTitle>
      <Prose>
        고객 앱에 표시된 QR을 매장 POS가 스캔해 결제하는 <Strong>자체 간편결제 시스템</Strong>입니다.
        구간별로 서로 다른 암호화를 적용해 종단 간 보안을 확보했습니다.
      </Prose>
      <Mermaid chart={qrPayChart} />
      <Bullets
        items={[
          <>
            <Strong>구간별 암호화 설계</Strong>: QR 토큰은 Fernet, API 페이로드는 AES-256-CBC(랜덤 IV +
            PKCS7), API 시크릿은 PBKDF2-HMAC-SHA256 해싱 저장 — 용도별로 알고리즘을 분리.
          </>,
          <>
            <Strong>Java 레거시 연동</Strong>: 결제 단말 SDK가 Java(<Code>nicepos.jar</Code>)뿐인 제약을
            jpype1로 JVM을 프로세스에 로드해 해결. NicePosClient 싱글톤으로 JVM 생명주기 관리.
          </>,
          <>
            서명 이미지(BMP)·할부·봉사료·세금 등 <Strong>오프라인 결제 실무 요건</Strong>을 모두 수용.
          </>,
        ]}
      />

      <SubTitle>PG 공통모듈 — 결제사를 갈아끼울 수 있는 구조</SubTitle>
      <Prose>
        온라인 결제(NICEPAY) 추가를 계기로, 특정 PG에 종속되지 않는{" "}
        <Strong>PG-중립 라우팅 구조</Strong>를 헥사고날 아키텍처로 설계했습니다.
      </Prose>
      <Mermaid chart={hexChart} />

      <SubTitle>정합성 — 망취소(Net-Cancel) 워커</SubTitle>
      <Prose>
        결제에서 가장 어려운 건 성공이 아니라 <Strong>애매하게 실패한 거래</Strong>입니다. 승인 요청 후
        응답을 못 받은 거래를 자동으로 복구하는 내장 워커를 구현했습니다.
      </Prose>
      <Mermaid chart={netCancelChart} />
      <Bullets
        items={[
          <>
            콜백이 오지 않아 PENDING에 고착되는 거래를 방어하고, 망취소 이력·큐 상태를 조회하는{" "}
            <Strong>관측 API</Strong>를 함께 제공 — 운영자가 &ldquo;지금 걸려 있는 거래&rdquo;를 즉시
            파악 가능.
          </>,
          <>
            keyset 페이지네이션 기반 결제 목록 조회, 예외 traceback 보존 + Sentry 연동, NICEPAY{" "}
            <Strong>E2E 테스트 하네스</Strong>까지 구축.
          </>,
        ]}
      />

      <SubTitle>성과</SubTitle>
      <SimpleTable
        head={["항목", "내용"]}
        rows={[
          ["자체 페이", "QR 결제 실서비스 운영 — 앱 QR 발급 ↔ 매장 POS 스캔 ↔ 승인 전 구간"],
          [
            "PG 확장성",
            <>
              <Code>provider_port</Code> 추상화로 NicePos(오프라인) + NICEPAY(온라인) 동시 운영, 신규 PG
              추가 시 어댑터만 구현
            </>,
          ],
          ["신뢰성", "망취소 자동화 + 멱등성 + 재시도로 결제 정합성 확보"],
          [
            "배포",
            <>
              <Code>DEPLOY_MODE</Code> 기반 self-host Docker 패키징 + 부트스트랩 시드 + 운영
              런북/인시던트 문서화
            </>,
          ],
        ]}
      />
    </>
  );
}

/* ---------- ③ 통합 본인인증 ---------- */

function IdentityContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.05 ~ 2026.07"],
          [
            "역할",
            <>
              KCP 본인인증 V2(S2S) 전환을{" "}
              <Strong>
                모바일 앱(Flutter) · 파트너 웹(Next.js) · 백엔드(FastAPI) 전 채널에서 직접 마이그레이션
              </Strong>
            </>,
          ],
          ["스택", "FastAPI, KCP 휴대폰본인확인 V2(S2S), JWT, Flutter, Next.js"],
        ]}
      />

      <SubTitle>문제</SubTitle>
      <Bullets
        items={[
          <>
            서비스마다 KCP를 <Strong>직연동</Strong>해 인증 로직·시크릿이 중복되고, 결과 응답에{" "}
            <Strong>CI/DI·개인정보가 평문 노출</Strong>되는 구조
          </>,
          <>
            웹은 팝업 ↔ opener 통신 방식이라 브라우저(bfcache, 제스처 컨텍스트, 팝업 차단)에 따라
            인증이 조용히 실패
          </>,
        ]}
      />

      <SubTitle>설계 — tx_id 기반 통합 인증</SubTitle>
      <Prose>
        여러 서비스가 공유하는 <Strong>통합 본인인증 서버</Strong>를 두고, 모든 채널이{" "}
        <Code>tx_id</Code> 하나로 결과를 조회하는 구조로 통일했습니다.
      </Prose>
      <Mermaid chart={identityChart} />

      <SubTitle>채널별 마이그레이션</SubTitle>
      <SimpleTable
        head={["채널", "작업 내용"]}
        rows={[
          [
            <Strong key="be">백엔드</Strong>,
            <>
              전 가입 경로를 tx_id 기반 V3로 통일 · <Code>/result</Code> 응답에서 PII 제거 · 가입
              중복검사를 CI→DI 기반으로 전환(서비스 간 교차가입 허용) · 2단계 스테이징 테이블 설계
            </>,
          ],
          [
            <Strong key="app">모바일 앱</Strong>,
            "KCP 직연동 → tx_id 방식 전환(signup v3) · 휴대폰번호 변경 재인증 흐름",
          ],
          [
            <Strong key="web">파트너 웹</Strong>,
            <>
              팝업 ↔ opener 통신 제거 → <Strong>단일 탭 전체 리다이렉트 + 백엔드 폴링</Strong> 방식
              재설계 · bfcache/제스처 등 브라우저 엣지케이스 TC 표 문서화
            </>,
          ],
          [
            <Strong key="member">기존 회원</Strong>,
            <>
              web_siteid 변경으로 인한 기존 회원 <Strong>재인증 게이트</Strong>(REAUTH_REQUIRED) —
              카카오 로그인 포함 전 로그인 경로 적용
            </>,
          ],
        ]}
      />

      <SubTitle>함께 수정한 보안 취약점</SubTitle>
      <SimpleTable
        head={["취약점", "조치"]}
        rows={[
          ["비밀번호 변경 시 휴대폰 불일치 우회 가능", "인증된 tx_id의 DI와 계정 소유자 대조 검증"],
          ["휴대폰번호 변경으로 타인 명의 이전 가능", "기존 CI 불일치 시 차단하는 소유권 검증 추가"],
          [
            "인증 결과에 CI/DI·개인정보 평문 노출",
            "응답 최소화(verified + 로그인 정보만), CI/DI 영구 비저장(단명 보관 후 폐기)",
          ],
          ["토큰 미제공 시 400 반환 (클라이언트 오분류)", "401로 정정해 인증 만료 처리 정상화"],
        ]}
      />

      <SubTitle>성과</SubTitle>
      <Bullets
        items={[
          <>
            인증 로직이 <Strong>한 서버로 수렴</Strong> — 신규 서비스는 테넌트 등록만으로 본인인증 도입
            가능 (멀티테넌트: <Code>/admin/clients</Code> + 복귀 URL 화이트리스트)
          </>,
          <>웹 인증 성공률 문제(팝업 통신 실패)를 폴링 구조로 원천 제거, 크로스브라우저 TC 문서화</>,
          <>
            <Strong>&ldquo;한 기능을 전 스택에서 끝까지&rdquo;</Strong> — 백엔드 설계부터 Flutter/Next.js
            클라이언트 마이그레이션, 기존 회원 재인증 운영 시나리오까지 단일 오너십으로 완료
          </>,
        ]}
      />
    </>
  );
}

/* ---------- ④ 검색엔진 ---------- */

function SearchContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.07 ~ (신규 구축)"],
          [
            "역할",
            <>
              <Strong>단독 설계·구축</Strong> (25/25 커밋)
            </>,
          ],
          ["스택", "OpenSearch 2.13, analysis-nori, Python 색인 배치, Docker Compose, MySQL"],
          ["대상", "매장 약 40만 건 — 지도 마커·검색·자동완성"],
        ]}
      />

      <SubTitle>한국어 분석 설계</SubTitle>
      <SimpleTable
        head={["구성 요소", "내용"]}
        rows={[
          [
            "형태소 분석",
            <>
              <Code>nori_tokenizer</Code> (decompound_mixed) — 복합어 분해와 원형 동시 색인
            </>,
          ],
          ["사용자 사전", "도메인 신조어 등록 (맛집·카공·빵집 등) — 잘못된 분해 방지"],
          [
            "동의어",
            <>
              <Code>synonym_graph</Code> 동의어 사전, <Strong>updateable</Strong> — 재색인 없이 동의어
              갱신
            </>,
          ],
          ["자동완성", "edge_ngram 분석기"],
          [
            "지리검색",
            <>
              <Code>geo_point</Code> — 지도 뷰포트·거리 기반 질의
            </>,
          ],
          [
            "랭킹 신호",
            <>
              카드 혜택 스코어(<Code>max_benefit_score</Code> — 카드별 프로모션 결합 후 최대값),
              광고/프로모션 마커 앵커
            </>,
          ],
        ]}
      />

      <SubTitle>무중단 재색인 파이프라인</SubTitle>
      <Prose>
        색인 스키마가 바뀌어도 <Strong>서비스 중단 없이</Strong> 전체 재색인이 가능하도록 alias 원자
        스왑 방식으로 설계했습니다.
      </Prose>
      <Mermaid chart={reindexChart} />
      <Bullets
        items={[
          <>
            혜택 정보는 <Strong>bulk count 1콜 + 필요한 쌍만 상세 조회(동시성 8)</Strong>로 API 부하를
            통제
          </>,
          <>
            좌표 없는 매장 제외, 법정동코드 사전 기반 <Strong>지역 토큰 라우팅</Strong> 등 검색 품질
            규칙 내장
          </>,
          <>
            배포 후 품질 회귀를 잡는 <Strong>검색 스모크 테스트</Strong> 스크립트 동봉
          </>,
          <>리포 경계 명확화: 색인·매핑은 이 저장소, 쿼리 빌더는 앱 저장소 — 역할 분리 문서화</>,
        ]}
      />

      <SubTitle>성과</SubTitle>
      <Bullets
        items={[
          <>
            지도 마커·매장 검색·자동완성을 지탱하는 검색 인프라를{" "}
            <Strong>2주 내 단독으로 0→1 구축</Strong>
          </>,
          <>
            동의어·사용자 사전을 운영 중 갱신 가능한 구조로 만들어{" "}
            <Strong>검색 품질 튜닝 사이클을 재색인에서 분리</Strong>
          </>,
        ]}
      />
    </>
  );
}

/* ---------- ⑤ DB 마이그레이션 ---------- */

function DbMigrationContent() {
  return (
    <>
      <MetaTable
        rows={[
          ["기간", "2026.07 ~"],
          [
            "역할",
            <>
              <Strong>단독 설계·구축</Strong> (46/49 커밋) — 프로세스 설계 + CI/CD + 가이드 문서 3종
            </>,
          ],
          ["스택", "Alembic (raw SQL 전용), MySQL, GitHub Actions (self-hosted), Slack 경보"],
          [
            "문제",
            <>
              여러 저장소가 각자 raw SQL을 수동 적용 → <Strong>DEV ↔ PROD 스키마 드리프트</Strong>, 이력
              부재, 롤백 불가
            </>,
          ],
        ]}
      />

      <SubTitle>설계 원칙</SubTitle>
      <SimpleTable
        head={["원칙", "이유"]}
        rows={[
          [
            <>
              autogenerate 금지, <Code>op.execute()</Code> raw SQL만
            </>,
            "ORM 모델이 여러 저장소에 흩어져 있어 단일 모델 기준 자동 생성이 불가능 — SQL을 정본으로",
          ],
          ["전역 단조 4자리 순번 + downgrade 의무", "적용 순서 명확화, 모든 변경의 되돌림 경로 보장"],
          [
            "문장 단위 분리 + 멱등 가드",
            "MySQL DDL은 트랜잭션 롤백 불가(implicit commit) — 중간 실패 시 재실행 가능해야 함",
          ],
          [
            <>
              대용량 ALTER <Code>[heavy]</Code> 태깅
            </>,
            "매장 40만·아이템 670만 행 테이블 COPY 유발 변경은 PROD 야간 창구에만 적용",
          ],
          ["append-only 유틸 스키마", "charset/collation 인시던트 재발 방지 규칙(utf8mb4) 명문화"],
        ]}
      />

      <SubTitle>배포 파이프라인 — 검증 게이트와 승인</SubTitle>
      <Mermaid chart={migrationChart} />

      <SubTitle>성과</SubTitle>
      <Bullets
        items={[
          <>
            스키마 변경의 <Strong>유일한 통로</Strong>를 확립 — 이후 모든 팀 스키마 변경이 이 저장소의
            PR 리뷰·CI를 통과
          </>,
          <>
            <Strong>드리프트 자동 감시 + Slack 경보</Strong>로 &ldquo;몰래 벌어진 불일치&rdquo;를 상시
            탐지
          </>,
          <>
            리비전 0001~0016 직접 작성 (카테고리 정규화, EAV 속성 테이블, 이벤트 로그 테이블 등) + 레거시
            SQL 94파일 아카이브로 과거 이력 보존
          </>,
          <>
            가이드 문서 3종 + 롤백 런북 — <Strong>사람이 바뀌어도 유지되는 프로세스</Strong>로 정착
          </>,
        ]}
      />
    </>
  );
}

export const projectContent: Record<string, () => ReactNode> = {
  "ai-backend": AiBackendContent,
  payments: PaymentsContent,
  identity: IdentityContent,
  search: SearchContent,
  "db-migration": DbMigrationContent,
};
