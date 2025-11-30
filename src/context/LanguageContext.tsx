"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    // Navigation
    "nav.about": "회사 소개",
    "nav.services": "서비스",
    "nav.portfolio": "포트폴리오",
    "nav.process": "프로세스",
    "nav.faq": "FAQ",
    "nav.contact": "문의하기",

    // Hero
    "hero.subtitle": "Web / App / Solution Development",
    "hero.tagline1": "고객과 기술을",
    "hero.tagline2": "안전하고 튼튼하게",
    "hero.tagline3": "연결합니다",
    "hero.description": "지속 가능하고 확장 가능한 솔루션을 구축하는 개발 파트너",
    "hero.cta.primary": "프로젝트 시작하기",
    "hero.cta.secondary": "포트폴리오 보기",
    "hero.stats.experience": "Years Experience",
    "hero.stats.projects": "Projects Completed",
    "hero.stats.satisfaction": "Client Satisfaction",
    "hero.stats.support": "Support Available",
    "hero.scroll": "Scroll",

    // About
    "about.subtitle": "About Us",
    "about.title1": "우리의",
    "about.title2": "개발 철학",
    "about.description": "RED BRIDGE DEV는 '다리'라는 이름처럼 고객과 기술을 안전하고 튼튼하게 연결합니다. 우리는 단순히 코드를 작성하는 것이 아니라, 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
    "about.techstack": "Tech Stack",
    "about.techstack.title": "기술 스택",

    // Values
    "about.value.stability": "안정성",
    "about.value.stability.desc": "대기업과 중견기업에서 쌓은 풍부한 경험을 바탕으로, 모든 프로젝트에 최고의 품질과 안정성을 보장합니다.",
    "about.value.scalability": "확장성",
    "about.value.scalability.desc": "단순히 코드를 작성하는 것이 아니라, 지속 가능하고 확장 가능한 솔루션을 구축합니다.",
    "about.value.collaboration": "협업",
    "about.value.collaboration.desc": "'다리'라는 이름처럼 고객과 기술을 안전하고 튼튼하게 연결합니다. 소통을 최우선으로 생각합니다.",
    "about.value.goal": "목표 지향",
    "about.value.goal.desc": "고객의 비즈니스 목표를 깊이 이해하고, 그 목표 달성을 위한 최적의 기술 솔루션을 제안합니다.",
    "about.value.expertise": "기술 전문성",
    "about.value.expertise.desc": "최신 기술 트렌드를 지속적으로 학습하고 적용하여, 항상 최선의 기술적 선택을 제공합니다.",
    "about.value.process": "체계적 프로세스",
    "about.value.process.desc": "체계적인 개발 프로세스와 철저한 품질 관리로 프로젝트의 성공을 보장합니다.",

    // Contact
    "contact.subtitle": "Contact Us",
    "contact.title1": "프로젝트",
    "contact.title2": "문의",
    "contact.description": "새로운 프로젝트를 시작하고 싶으시다면 언제든 연락주세요",
    "contact.info": "연락처",
    "contact.quickContact": "빠른 연락",
    "contact.kakao": "카카오톡 채널 문의",
    "contact.chat": "실시간 채팅 시작",
    "contact.hours": "운영 시간",
    "contact.hours.weekday": "평일:",
    "contact.hours.lunch": "점심시간:",
    "contact.hours.note": "* 긴급 문의는 카카오톡 채널로 연락주세요",
    "contact.form.name": "이름",
    "contact.form.email": "이메일",
    "contact.form.company": "회사명",
    "contact.form.company.placeholder": "회사명 (선택사항)",
    "contact.form.projectType": "프로젝트 유형",
    "contact.form.budget": "예상 예산",
    "contact.form.message": "프로젝트 설명",
    "contact.form.message.placeholder": "프로젝트에 대해 자세히 알려주세요. (기능, 일정, 특별 요구사항 등)",
    "contact.form.submit": "문의하기",
    "contact.form.submitting": "전송 중...",
    "contact.form.success": "전송 완료!",
    "contact.form.error": "오류 발생. 다시 시도해주세요.",
    "contact.form.select": "선택해주세요",
    "contact.form.projectType.web": "웹 개발",
    "contact.form.projectType.app": "앱 개발",
    "contact.form.projectType.solution": "솔루션 개발",
    "contact.form.projectType.consulting": "기술 컨설팅",
    "contact.form.projectType.other": "기타",
    "contact.form.budget.under1000": "1,000만원 미만",
    "contact.form.budget.1000-3000": "1,000만원 - 3,000만원",
    "contact.form.budget.3000-5000": "3,000만원 - 5,000만원",
    "contact.form.budget.5000-1억": "5,000만원 - 1억원",
    "contact.form.budget.over1억": "1억원 이상",
    "contact.form.budget.undecided": "미정",

    // Footer
    "footer.services": "서비스",
    "footer.company": "회사",
    "footer.contact": "연락처",
    "footer.privacy": "개인정보처리방침",
    "footer.terms": "이용약관",
    "footer.rights": "All rights reserved.",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.process": "Process",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    // Hero
    "hero.subtitle": "Web / App / Solution Development",
    "hero.tagline1": "Connecting customers and technology",
    "hero.tagline2": "safely and securely",
    "hero.tagline3": "",
    "hero.description": "A development partner building sustainable and scalable solutions",
    "hero.cta.primary": "Start a Project",
    "hero.cta.secondary": "View Portfolio",
    "hero.stats.experience": "Years Experience",
    "hero.stats.projects": "Projects Completed",
    "hero.stats.satisfaction": "Client Satisfaction",
    "hero.stats.support": "Support Available",
    "hero.scroll": "Scroll",

    // About
    "about.subtitle": "About Us",
    "about.title1": "Our",
    "about.title2": "Development Philosophy",
    "about.description": "RED BRIDGE DEV, as the name 'bridge' suggests, safely and securely connects customers and technology. We don't just write code, we build sustainable and scalable solutions.",
    "about.techstack": "Tech Stack",
    "about.techstack.title": "Technology Stack",

    // Values
    "about.value.stability": "Stability",
    "about.value.stability.desc": "Based on our extensive experience with large and mid-sized companies, we guarantee the highest quality and stability in every project.",
    "about.value.scalability": "Scalability",
    "about.value.scalability.desc": "We don't just write code, we build sustainable and scalable solutions.",
    "about.value.collaboration": "Collaboration",
    "about.value.collaboration.desc": "Like our name 'bridge', we safely connect customers and technology. Communication is our top priority.",
    "about.value.goal": "Goal-Oriented",
    "about.value.goal.desc": "We deeply understand our clients' business goals and propose optimal technology solutions to achieve them.",
    "about.value.expertise": "Technical Expertise",
    "about.value.expertise.desc": "We continuously learn and apply the latest technology trends to always provide the best technical choices.",
    "about.value.process": "Systematic Process",
    "about.value.process.desc": "We ensure project success through a systematic development process and thorough quality management.",

    // Contact
    "contact.subtitle": "Contact Us",
    "contact.title1": "Project",
    "contact.title2": "Inquiry",
    "contact.description": "Contact us anytime if you want to start a new project",
    "contact.info": "Contact Info",
    "contact.quickContact": "Quick Contact",
    "contact.kakao": "KakaoTalk Channel",
    "contact.chat": "Start Live Chat",
    "contact.hours": "Business Hours",
    "contact.hours.weekday": "Weekdays:",
    "contact.hours.lunch": "Lunch:",
    "contact.hours.note": "* For urgent inquiries, please contact us via KakaoTalk",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.company": "Company",
    "contact.form.company.placeholder": "Company name (optional)",
    "contact.form.projectType": "Project Type",
    "contact.form.budget": "Estimated Budget",
    "contact.form.message": "Project Description",
    "contact.form.message.placeholder": "Please tell us about your project in detail. (features, timeline, special requirements, etc.)",
    "contact.form.submit": "Send Inquiry",
    "contact.form.submitting": "Sending...",
    "contact.form.success": "Sent successfully!",
    "contact.form.error": "Error occurred. Please try again.",
    "contact.form.select": "Please select",
    "contact.form.projectType.web": "Web Development",
    "contact.form.projectType.app": "App Development",
    "contact.form.projectType.solution": "Solution Development",
    "contact.form.projectType.consulting": "Technical Consulting",
    "contact.form.projectType.other": "Other",
    "contact.form.budget.under1000": "Under $10,000",
    "contact.form.budget.1000-3000": "$10,000 - $30,000",
    "contact.form.budget.3000-5000": "$30,000 - $50,000",
    "contact.form.budget.5000-1억": "$50,000 - $100,000",
    "contact.form.budget.over1억": "Over $100,000",
    "contact.form.budget.undecided": "Undecided",

    // Footer
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  useEffect(() => {
    // Check localStorage or browser language
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "ko" || savedLang === "en")) {
      setLanguageState(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("ko")) {
        setLanguageState("ko");
      } else {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ko] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
