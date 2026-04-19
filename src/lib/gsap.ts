import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 전 프로젝트에서 이 모듈을 import하면 최초 import 시에만 registerPlugin 실행됨
// (ESM 모듈은 싱글톤으로 평가되므로 자연스러운 중앙화)
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
