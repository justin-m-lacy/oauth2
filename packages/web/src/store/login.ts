import { apiGetLogin, apiSendGrantCode } from "@/api/login";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore('user', () => {

	/// True while fetching login state.
	const busy = ref(false);

	/// True if active login session exists.
	const loggedIn = ref(false);

	const sendGrantCode = async (code: string, state: string) => {

		/// already loggedIn.
		if (loggedIn.value == true) return;

		try {

			busy.value = true;

			const result = await apiSendGrantCode(code, state);

			if (result.loggedIn) {
				loggedIn.value = true;
			}

		} catch (err) {
			console.warn(err);
		} finally {
			busy.value = false;
		}

	}


	const getLogin = async () => {

		try {

			if (busy.value) return;

			busy.value = true;

			const result = await apiGetLogin();
			loggedIn.value = result.loggedIn;

		} catch (err) {

			console.warn(err);

		} finally {
			busy.value = false;
		}

	}

	return {
		sendGrantCode,
		busy,
		loggedIn,
		getLogin
	}

});