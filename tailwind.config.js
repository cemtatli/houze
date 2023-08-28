/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				lg: '1rem',
			},
			screens: {
				'2xl': '1820px',
			},
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				sans: ['var(--font-poppsins)'],
			},
			colors: {
				brand: {
					50: '#fff3ed',
					100: '#ffe3d4',
					200: '#ffc3a9',
					300: '#ff9a72',
					400: '#fe5829',
					500: '#fd3c12',
					600: '#ee2208',
					700: '#c51509',
					800: '#9c1310',
					900: '#7e1310',
					950: '#440607',
				},
			},
			height: {
				'dynamic-screen': '100dvh',
				'fit-screen': 'calc(100vh - 6rem)',
				'fit-screen-mobile': 'calc(100vh - 4rem)',
			},
			minHeight: {
				'dynamic-screen': '100dvh',
				'fit-screen': 'calc(100vh - 6rem)',
				'fit-screen-mobile': 'calc(100vh - 4rem)',
			},
			maxHeight: {
				'dynamic-screen': '100dvh',
				'fit-screen': 'calc(100vh - 5rem)',
				'fit-screen-mobile': 'calc(100vh - 3rem)',
			},
			screens: {
				xs: '450px',
			},
		},
	},
	plugins: [],
};

