import { setLanguage, type Language } from './i18n';

// 여기서 언어를 직접 설정하세요
// Change the language here directly
const LANGUAGE: Language = 'ko'; // 'ko' for Korean, 'en' for English

// 언어 설정을 초기화하는 함수
export function initializeLanguage(): void {
  setLanguage(LANGUAGE);
}

// 현재 언어를 가져오는 함수
export function getCurrentLanguage(): Language {
  return LANGUAGE;
}
