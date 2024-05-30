/** @type {import('tailwindcss').Config} */
import AppPlugin from './tailwind.App.plugin'


export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'primary': ['Jost', 'Helvetica', 'Arial', 'sans-serif']
            },
            borderColor: {
                'red': 'hsl(340, 100%, 60%)',
                'lime': 'hsl(162 100% 45%)',

            },
            lineHeight: {
                'h2': '85%',
                'p': '1.5',
            },
            gridTemplateColumns: {
                'profile': 'auto 1fr'
            },
            textColor: ['hover'],
            variants: {
                extend: {
                    lineHeight: ['h2', 'p'],
                },
            },

        },
        colors: {
            'blue_dark': 'hsl(243, 100%, 22%)',
            'white': 'hsl(45, 6%, 86%)',
            'red': {
                100: 'hsl(340, 100%, 60%)',
                200: 'hsl(340, 100%, 50%)',
                300: 'hsl(340, 100%, 40%)',
                400: 'hsl(340, 100%, 30%)',
                500: 'hsl(340, 100%, 20%)'

            },
            'lime': {
                100: 'hsl(162 100% 45%)',
                200: 'hsl(162 100% 35%)',
                300: 'hsl(162 100% 25%)',
                400: 'hsl(162 100% 15%)',
                400: 'hsl(162 100% 05%)',
            },
            'gray': {
                100: 'hsl(162 10% 70%)',
                200: 'hsl(162 10% 40%)',
                300: 'hsl(162 10% 20%)',
                400: 'hsl(162 10% 10%)',
                500: 'hsl(162 10% 5%) ',
            }
        }
    },
    plugins: [AppPlugin],
}

