const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme, config }) => {
    addBase({

        'h1, h2': {
            fontSize: theme('fontSize.5xl'),
            letterSpacing: '-0.025em',
            fontWeight: '600',
            textTransform: 'uppercase',
            lineHeight: '100%',
            paddingBottom: '0.5rem',
        },
        'h3': {
            fontSize: theme('fontSize.2xl'),
            fontWeight: '600',
            lineHeight: '100%',
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            margin: '.5rem 0',
        },
        'h4': {
            fontSize: theme('fontSize.xl'),
            fontWeight: '200',
            lineHeight: '100%',
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            margin: '.5rem 0',
        },
        'a:focus, input:focus, button:focus, textarea:focus': {
            outline: 'none',
            boxShadow: 'none',
            borderWidth: '0',
        },

        'a:focus-visible, input:focus-visible, button:focus-visible': {
            borderColor: config('theme.borderColor.lime'),
            borderWidth: config('theme.borderWidth.2'),
            borderRadius: config('theme.borderRadius.full'),
            fontWeight: '400',

        },

        'strong': {
            fontWeight: '500',
        },
        'p, li, label': {
            fontSize: theme('fontSize.sm'),
            fontWeight: '300',
            letterSpacing: '0.025em'
        },
        'input': {
            width: '100%',
            height: '3rem',
            padding: '0 1rem',
            fontSize: '1rem',
            letterSpacing: '0.06em',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '9999px',
            cursor: 'text',
            fontWeight: '300',
            margin: '0.5rem 0'
        },
        'textarea': {
            width: '100%',
            borderRadius: '20px',
            padding: '1rem',
            fontWeight: '300',
            letterSpacing: '0.06em',
            color: 'black',
            fontSize: '1rem',
        },
        backgroundImage: {
            'logo-background': "url('./assets/LiveDive-Logo-W.svg')",
        }
    })

    addComponents({
    })

    addUtilities({
        '.content-hidden': {
            contentVisibility: 'hidden'
        },
        '.center-xy': {
            display: 'grid',
            placeItems: 'center',
            height: '100vh',
        },
        '.center-xy-2': {
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        ".scrollbar-hide": {
            "&::-webkit-scrollbar": {
                display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
        },
        '.button-cancel': {
            backgroundColor: theme('backgroundColor.gray.300'),
        },
        '.button-cancel-hover': {
            backgroundColor: theme('backgroundColor.gray.200'),
        },
        ".bg-pattern-01": {
            background: "repeat url('./assets/pattern-01.svg')",
        },
        ".bg-pattern-02": {
            backgroundImage: "url('./assets/pattern-02.svg')",
            backgroundSize: "400%",
        },

    }, ['responsive', 'hover']);
})