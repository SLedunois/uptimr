const BLUE = {
    100: '#544AC4',
    90: '#655CC9',
    80: '#766ECF',
    70: '#8780D5',
    60: '#9892DB',
    50: '#A9A4E1',
    40: '#BAB6E7',
    30: '#CBC8ED',
    20: '#DCDAF3',
    10: '#EDECF9'
}

const BLACK = {
    100: '#4a4a4a',
    90: '#5C5C5C',
    80: '#6E6E6E',
    70: '#808080',
    60: '#929292',
    50: '#A4A4A4',
    40: '#B6B6B6',
    30: '#C8C8C8',
    20: '#DADADA',
    10: '#ECECEC'
}

const RED = {
    100: '#f26c6d',
    90: '#F37A7B',
    80: '#F4898A',
    70: '#F59898',
    60: '#F7A6A7',
    50: '#F8B5B5',
    40: '#F9C4C4',
    30: '#FBD2D3',
    20: '#FCE1E1',
    10: '#FDF0F0'
}

const PINK = {
    100: '#ff6291',
    90: '#FF719C',
    80: '#FF81A7',
    70: '#FF91B2',
    60: '#FFA0BD',
    50: '#FFB0C8',
    40: '#FFC0D3',
    30: '#FFCFDE',
    20: '#FFDFE9',
    10: '#FFEFF4'
}

const ORANGE = {
    100: '#FF947A',
    90: '#FF9E87',
    80: '#FFA994',
    70: '#FFB4A1',
    60: '#FFBEAF',
    50: '#FFC9BC',
    40: '#FFD4C9',
    30: '#FFDED7',
    20: '#FFE9E4',
    10: '#FFF4F1'
}

const YELLOW = {
    100: '#F6B923',
    90: '#F6C039',
    80: '#F7C74F',
    70: '#F8CE65',
    60: '#F9D57B',
    50: '#FADC91',
    40: '#FBE3A7',
    30: '#FCEABD',
    20: '#FDF1D3',
    10: '#FEF8E9'
}

const PURPLE = {
    100: '#BF83FF',
    90: '#C58FFF',
    80: '#CB9BFF',
    70: '#D2A8FF',
    60: '#D8B4FF',
    50: '#DFC1FF',
    40: '#E5CDFF',
    30: '#EBD9FF',
    20: '#F2E6FF',
    10: '#F8F2FF'
}

const GREEN = {
    100: '#30D99D',
    90: '#44DCA6',
    80: '#59E0B0',
    70: '#6EE4BA',
    60: '#82E8C4',
    50: '#97ECCE',
    40: '#ACEFD7',
    30: '#C0F3E1',
    20: '#D5F7EB',
    10: '#EAFBF5'
}

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            black: BLACK,
            blue: BLUE,
            red: RED,
            pink: PINK,
            orange: ORANGE,
            yellow: YELLOW,
            purple: PURPLE,
            green: GREEN,
            white: '#FFFFFF',
            background: '#FBFBFB'
        },
        fontFamily: {
            'sans': ['Lato', 'Helvetica', 'Arial', 'sans-serif']
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
