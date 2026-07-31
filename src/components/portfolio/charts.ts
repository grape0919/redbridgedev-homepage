// 포트폴리오 페이지에서 렌더링하는 mermaid 다이어그램 정의

export const overviewChart = `graph TB
    subgraph Client["클라이언트"]
        APP["모바일 앱<br/>(Flutter)"]
        POS["매장 POS<br/>(Windows)"]
        WEB["파트너 웹<br/>(Next.js)"]
    end

    subgraph Mine["직접 설계·구축한 백엔드 레이어"]
        AIBE["① AI 백엔드<br/>SSE 프록시·영속화"]
        AGENT["① AI 에이전트<br/>자체 DAG → ReAct 전환"]
        PAY["② 자체 간편결제<br/>QR 결제·PG 게이트웨이"]
        IDN["③ 통합 본인인증<br/>tx_id 기반 KCP V2"]
        SEARCH["④ 검색엔진<br/>OpenSearch + nori"]
        APPBE["앱 메인 백엔드<br/>20개 도메인"]
    end

    subgraph Infra["데이터 · 인프라"]
        MIG["⑤ DB 마이그레이션<br/>플랫폼"]
        DB[("MySQL / pgvector")]
        OS[("OpenSearch")]
    end

    subgraph External["외부 연동"]
        LLM["OpenAI<br/>GPT · Whisper · TTS"]
        PG["NICEPAY / NicePos<br/>KCP"]
    end

    APP --> AIBE --> AGENT --> LLM
    AGENT --> DB
    APP --> APPBE
    POS --> PAY --> PG
    WEB --> IDN
    APP --> IDN --> PG
    APPBE --> SEARCH --> OS
    MIG --> DB`;

export const sseChart = `sequenceDiagram
    participant App as 모바일 앱
    participant Proxy as AI 백엔드 (SSE 프록시)
    participant Agent as AI 에이전트 서버
    participant DB as MySQL

    App->>Proxy: POST /ai/stream (질문)
    Proxy->>Agent: SSE 연결 (백그라운드 task + asyncio.Queue)
    Agent-->>Proxy: meta → intent → intro → markdown* → json_payload → done
    Proxy-->>App: 이벤트 실시간 중계 (30s idle keepalive)

    Note over App,Proxy: 클라이언트가 중간에 끊겨도…
    App--xProxy: 연결 끊김
    Agent-->>Proxy: 백그라운드는 done까지 계속 소비
    Proxy->>DB: 대화·메시지·턴 로그 영속화<br/>(trace_id, TTFR/TTFC latency, intent, error)`;

export const reactChart = `graph LR
    subgraph DAG["기존: 자체 DAG 파이프라인"]
        A[hydrate_session] --> B[safety_guard] --> C[resolve_action]
        C --> D{액션 분기}
        D --> E["recommend / plan / benefit<br/>compare / detail / replace"]
        E --> F[normalize → enrich → finalize]
    end

    subgraph ReAct["전환: ReAct 툴 에이전트"]
        G["Tool Schema Registry<br/>Phase 1"] --> H["LLM Provider Facade<br/>Phase 2"]
        H --> I["Clarify · Multi-turn Merge<br/>Phase 3"]
        I --> J["agent_loop + Enrichment Chain<br/>Phase 4"]
    end

    DAG -. "무중단 점진 마이그레이션" .-> ReAct`;

export const voiceChart = `graph LR
    V["음성 입력<br/>(base64 audio)"] --> STT["Whisper STT"]
    STT --> H{"헐루시네이션<br/>감지"}
    H -- 정상 --> AG["에이전트 추론"] --> MD["markdown 스트리밍"]
    H -- 이상 --> ERR["전용 에러코드 반환"]
    MD --> SUM["intro 요약<br/>(LLM 병렬 생성)"] --> TTS["gpt-4o-mini-tts"] --> OUT["오디오 스트리밍"]`;

export const qrPayChart = `sequenceDiagram
    participant User as 고객 앱
    participant POS as 매장 POS
    participant Pay as 간편결제 서버
    participant Nice as NicePos (JVM)
    participant Card as 카드사/VAN

    User->>User: QR 발급 (Fernet 암호화 토큰)
    POS->>User: QR/바코드 스캔
    POS->>Pay: POST /qr/pay<br/>AES-256-CBC 암호화 페이로드<br/>(금액·할부·서명 BMP·거래 ID)
    Pay->>Pay: X-API-Key + Secret 인증<br/>(PBKDF2 해싱 검증)
    Pay->>Pay: QR 복호화 → 매장·회원 식별<br/>(이중 DB 조회)
    Pay->>Nice: 승인 요청 (jpype로 nicepos.jar 호출)
    Nice->>Card: 카드 승인
    Card-->>Nice: 승인 결과
    Nice-->>Pay: 응답
    Pay->>Pay: 거래 저장 + 응답코드 분기 로깅
    Pay-->>POS: 결제 결과 (영수증 출력)`;

export const hexChart = `graph TB
    subgraph API["api 레이어"]
        R["approve / qr / pg 라우터"]
    end
    subgraph APPL["application 레이어"]
        UC["결제 유스케이스<br/>(승인·취소·조회)"]
    end
    subgraph DOM["domain 레이어 — 포트(인터페이스)"]
        PP["provider_port"]
        CP["credential_port"]
        RP["repository_port"]
    end
    subgraph INFRA["infrastructure 레이어 — 어댑터"]
        NICE["NicePos 어댑터<br/>(JVM/오프라인)"]
        NPAY["NICEPAY 어댑터<br/>(HTTP/온라인)"]
        REPO["MySQL Repository"]
    end

    R --> UC --> PP & CP & RP
    PP -. 구현 .- NICE & NPAY
    RP -. 구현 .- REPO
    UC -- "provider_meta(JSON)로<br/>런타임 라우팅" --> PP`;

export const netCancelChart = `stateDiagram-v2
    [*] --> PENDING: 승인 요청 전송
    PENDING --> APPROVED: 정상 응답
    PENDING --> TIMEOUT: 응답 유실/타임아웃
    TIMEOUT --> NET_CANCEL_QUEUE: 망취소 큐 등록
    NET_CANCEL_QUEUE --> CANCELLED: 워커가 망취소 성공
    NET_CANCEL_QUEUE --> RETRY: 실패 → 지수 백오프 재시도
    RETRY --> NET_CANCEL_QUEUE
    APPROVED --> [*]
    CANCELLED --> [*]`;

export const identityChart = `sequenceDiagram
    participant C as 클라이언트<br/>(앱 / 파트너 웹)
    participant BE as 서비스 백엔드
    participant IDN as 통합 본인인증 서버
    participant KCP as KCP (S2S)

    C->>IDN: 인증 시작 (테넌트별 web_siteid)
    IDN->>KCP: 거래 등록 (reg_cert_key)
    C->>KCP: 인증창에서 휴대폰 본인확인
    KCP-->>IDN: 콜백 (CI/DI — 단명 보관)
    C->>BE: tx_id 전달
    BE->>IDN: GET /result/{tx_id}<br/>(client_secret S2S 인증)
    IDN-->>BE: verified + 최소 정보만<br/>(CI/DI·PII 클라이언트 미노출)
    BE->>BE: 가입/변경 처리 후<br/>스테이징 데이터 폐기`;

export const reindexChart = `graph LR
    A[("MySQL<br/>매장 40만")] --> B["문서 조립<br/>+ 네이버 카테고리·메뉴"]
    C["카드 혜택 API<br/>bulk 1콜 + 상세(동시성 8)"] --> B
    B --> D["신규 인덱스에<br/>bulk 색인"]
    D --> E{"검증 통과?"}
    E -- 예 --> F["alias 원자 스왑<br/>stores → 신규 인덱스"]
    E -- 아니오 --> G["스왑 없이 중단<br/>(기존 인덱스 무영향)"]
    F --> H["구 인덱스 정리"]`;

export const migrationChart = `graph TB
    PR["PR 생성"] --> CI["CI: 스크래치 MySQL에서<br/>up → down → up 왕복 테스트"]
    CI --> PREVIEW["SQL 미리보기 + lint"]
    PREVIEW --> DEV["develop 머지 → DEV 자동 적용"]
    DEV --> DRIFT["drift 자동 감시<br/>(불일치 시 Slack 경보)"]
    DEV --> MAIN["main 머지"]
    MAIN --> GATE{"GitHub Environment<br/>수동 승인"}
    GATE --> BACKUP["PROD 풀덤프 백업"]
    BACKUP --> APPLY["PROD 적용 + verify"]
    APPLY --> RUNBOOK["실패 시: 롤백 런북<br/>(DR 시나리오 S1~S8)"]`;
