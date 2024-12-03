<script lang="ts">
	interface HashtagData {
		hashtag: string;
		count: number;
	}

	let hashtagInput = '';
	let hashtags: HashtagData[] = [];

	async function handleSubmit() {
		if (!hashtagInput) {
			return alert('해시태그를 입력해주세요');
		}
		if (!hashtagInput.includes('#')) {
			return alert('해시태그에 #을 붙여주세요');
		}

		try {
			const hashtag = hashtagInput.trim();

			const response = await fetch('/api/instagram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ hashtag })
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || '요청 처리 중 오류가 발생했습니다.');
			}

			const newHashtag: { data: HashtagData } = await response.json();
			hashtags = [...hashtags, newHashtag.data];
			hashtagInput = '';
		} catch (error) {
			console.error('Error:', error);
			alert(error instanceof Error ? error.message : '오류가 발생했습니다.');
		}
	}
</script>

<div class="container mx-auto max-w-7xl p-4">
	<div class="mb-6 rounded-lg bg-white p-6 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">Instagram Hashtag Counter</h1>
		<form on:submit|preventDefault={handleSubmit} class="flex gap-2">
			<input
				type="text"
				bind:value={hashtagInput}
				placeholder="해시태그를 입력하세요"
				class="flex-1 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
			>
				검색
			</button>
		</form>
	</div>

	{#if hashtags.length > 0}
		<div class="mb-6 rounded-lg bg-white p-6 shadow-md">
			<h2 class="text-lg font-semibold">해시태그 결과</h2>
			<ul class="mt-4">
				{#each hashtags as { hashtag, count }}
					<li class="flex justify-between border-b py-2">
						<span>#{hashtag}</span>
						<span>게시물 수: {count.toLocaleString()}개</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #f5f5f5;
	}
</style>
