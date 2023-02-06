/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			minHeight: {
				12: '48px',
				18: '64px',
			},
			minWidth: {
				40: '160px',
				50: '200px',
			},
		},
	},
	plugins: [],
}
