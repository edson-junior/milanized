export {};
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    gtag: Function;
    instgrm: {
      Embeds: { process: Function };
    };
  }
}

declare module '*.css' {
  const content: string;
  export default content;
}
