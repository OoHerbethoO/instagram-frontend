/** @type {import('tailwindcss').Config} */

function rem(px) {
  return `${px / 16.7}rem`
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',
        themes: {
          light: {
            white: '#FFFFFF',
            black: '#0F0F15',
            gray: {
              'gray-100': '#f5f6f7',
              'gray-200': '#f0f1f2',
              'gray-300': '#e8e9ea',
              'gray-400': '#abadae',
              'gray-500': '#878A8C',
              'gray-600': '#7c7f80',
              'gray-700': '#76797a',
              'gray-800': '#454747',
              'gray-900': '#0F0F15',
            },
            primary: {
              light: '#eaf1ef',
              primary: '#2f786b',
              dark: '#1F6461',
            },
            danger: {
              light: '#F9E8EA',
              danger: '#E84F61',
              dark: '#CD3D4E',
            },
          },
          dark: {
            white: '#0F0F15',
            black: '#f5f6f7',
            gray: {
              'gray-800': '#EAECED',
              'gray-700': '#D6D8D9',
              'gray-600': '#B6B8B8',
              'gray-500': '#878A8C',
              'gray-400': '#525556',
              'gray-300': '#37393A',
              'gray-200': '#1F1F20',
              'gray-100': '#0F0F15',
              'gray-900': '#F7F9FA',
            },
            primary: {
              light: '#E3EFEA',
              primary: '#287B77',
              dark: '#1F6461',
            },
            danger: {
              light: '#F9E8EA',
              danger: '#E84F61',
              dark: '#CD3D4E',
            },
          },
        },
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        primary: {
          light: 'var(--primary-light)',
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        danger: {
          light: 'var(--danger-light)',
          DEFAULT: 'var(--danger)',
          dark: 'var(--danger-dark)',
        },
      },
      spacing: {
        D: '46px',
        sm: rem(36),
        md: rem(42),
        lg: rem(50),
      },
      minHeight: {
        D: '46px',
        sm: rem(36),
        md: rem(42),
        lg: rem(50),
      },
      minWidth: {
        D: rem(46),
        sm: rem(36),
        md: rem(42),
        lg: rem(50),
      },
      borderRadius: {
        DEFAULT: rem(6),
      },
    },
    fontSize: {
      '-fs-4': rem(12),
      '-fs-3': rem(13),
      '-fs-2': rem(14),
      '-fs-1': rem(15),
      'fs-base': rem(16),
      'fs-1': rem(18),
      'fs-2': rem(20),
      'fs-3': rem(22),
      'fs-4': rem(24),
      'fs-5': rem(26),
      'fs-6': rem(28),
      'fs-7': rem(30),
      'fs-8': rem(32),
      'fs-9': rem(34),
      'fs-10': rem(36),
      'fs-11': rem(38),
      'fs-12': rem(40),
      'fs-13': rem(42),
      'fs-14': rem(44),
      'fs-15': rem(46),
      'fs-16': rem(48),
      'fs-17': rem(50),
      'fs-18': rem(52),
      'fs-19': rem(54),
      'fs-20': rem(56),
    },
  },
  plugins: [],
}
