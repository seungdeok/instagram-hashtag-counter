// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Env {
			INSTAGRAM_USERNAME: string;
			INSTAGRAM_PASSWORD: string;
			INSTAGRAM_NAME: string;
		}
	}
}

export {};
