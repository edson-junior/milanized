declare module '*.css';
declare global {
  interface Window {
    gtag: Function;
    instgrm: {
      Embeds: { process: Function };
    };
  }
}
