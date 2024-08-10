export declare const tokens: (mode: string) => {
    primary: {
        DEFAULT: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    secondary: {
        DEFAULT: string;
    };
    black: {
        DEFAULT: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    white: {
        DEFAULT: string;
        100: string;
        200?: undefined;
    };
    gray: {
        DEFAULT: string;
    };
    accentMain: string;
    borderColor: string;
    blue: string;
} | {
    white: {
        DEFAULT: string;
        100: string;
        200: string;
    };
    primary: {
        DEFAULT: string;
        500: string;
        100?: undefined;
        200?: undefined;
        300?: undefined;
        400?: undefined;
        600?: undefined;
        700?: undefined;
        800?: undefined;
        900?: undefined;
    };
    secondary: {
        DEFAULT: string;
    };
    black: {
        DEFAULT: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    gray: {
        DEFAULT: string;
    };
    accentMain: string;
    borderColor: string;
    blue: string;
};
export declare const themeSettings: any;
export declare const ColorModeContext: import("react").Context<{
    toggleColorMode: () => void;
}>;
export declare const useMode: () => any[];
