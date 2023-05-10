export interface ThirdPartyLocalization {
    changeLanguage: (language: string) => void;
  }
  
  export type ThirdPartyLocalizations = {
    [key: string]: ThirdPartyLocalization;
  };
  