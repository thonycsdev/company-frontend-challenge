import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				colorFullRed: '#D93644',
				wineRed: '#A64951',
				coolPink: '#F2949C',
				coolBlack: '#0D0D0D'
			}
		}
	},
	plugins: []
};
export default config;
