import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(),
		//  mkcert()
		],
	preview: {
		port: 4041, // Number(process.env.PREVIEW_PORT),
		strictPort: true
	},
	server: {
		port: 4044, // Number(process.env.SERVER_PORT),
		strictPort: true,
		cors: true,
		allowedHosts: ["http://192.168.43.107:8081"],
		host: '172.17.192.1',
		// https: 
		// {
		// 	key: fs.readFileSync("./cert/server.key"),
		// 	cert: fs.readFileSync("./cert/server.crt"),
			
		// }
		
		// {

		// }

	}
});
