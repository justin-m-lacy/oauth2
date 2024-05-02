import { apiGetLogin } from "@/api/login";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore('user', () => {

	/// True while fetching login state.
	const busy = ref(false);

	/// True if active login session exists.
	const loggedIn = ref(false);

	const getLogin = async () => {

		try {

			const result = await apiGetLogin();
			loggedIn.value = result.loggedIn;

		} catch (err) {

			console.warn(err);
			loggedIn.value = false;

		} finally {
			busy.value = false;
		}

	}

	return {

		busy,
		loggedIn,
		getLogin
	}

});