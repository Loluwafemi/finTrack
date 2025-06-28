import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(),
		//  mkcert()
		],
	preview: {
		port: 4041, // Number(process.env.PREVIEW_PORT),
		strictPort: true
	},
	server: {
		port: 8080, // Number(process.env.SERVER_PORT),
		strictPort: true,
		cors: true,
		allowedHosts: ["http://192.168.43.107:8081"],
		host: '172.18.208.1',

	}
});
