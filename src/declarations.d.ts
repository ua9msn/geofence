declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: any;
    export default value;
}

declare module '*.webp' {
    const value: any;
    export default value;
}

declare module '*.mod.scss' {
    const styles: {[key: string]: string};
    export default styles;
}

declare module '*.css' {
    const styles: {[key: string]: string};
    export default styles;
}

declare namespace NodeJS {
    export interface ProcessEnv {
        ENDPOINT: string;
    }
}
