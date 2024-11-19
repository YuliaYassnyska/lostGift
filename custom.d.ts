declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module './plugins/SpineWebGLPlugin' {
    const SpineWebGLPlugin: any;
    export default SpineWebGLPlugin;
}
