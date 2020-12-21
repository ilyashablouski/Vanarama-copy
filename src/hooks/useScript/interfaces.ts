declare global {
  interface Window {
    Trustpilot: any;
  }
}

window.Trustpilot = window.Trustpilot || {};

export type TCachedScripts = string[];
export type TSrc = string;
