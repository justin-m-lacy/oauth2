import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useLoginStore } from '@/store/login';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

(() => {
	const params = new URL(window.location.href).searchParams;

	const code = params.get('code');
	const state = params.get('state');
	if (code && state) {
		useLoginStore().sendGrantCode(code, state);
	}
})();


app.mount('#app');