<script lang="ts">
	interface Post {
		id: string;
		content: string;
		imageUrl: string;
		likes: number;
		comments: number;
		link: string;
	}

	interface HashtagData {
		hashtag: string;
		count: number;
		posts: Post[];
	}

	let hashtagInput = '';
	let posts: HashtagData[] = [];
	let totalCount = 0;

	function generateDummyPosts(tag: string): Post[] {
		return Array.from({ length: 6 }, (_, i) => ({
			id: `${tag}-${i}`,
			content: `${tag} 관련 인스타그램 게시물 ${i + 1}`,
			imageUrl: `/api/placeholder/300/300`,
			likes: Math.floor(Math.random() * 1000),
			comments: Math.floor(Math.random() * 100),
			link: `https://instagram.com/p/${Math.random().toString(36).substr(2, 11)}`
		}));
	}

	function handleSubmit() {
		if (!hashtagInput) {
			return alert('해시태그를 입력해주세요');
		}
		const hashtags = hashtagInput.split(',').map((tag) => tag.trim());

		posts = hashtags.map((tag) => ({
			hashtag: tag,
			count: Math.floor(Math.random() * 10000),
			posts: generateDummyPosts(tag)
		}));

		totalCount = posts.reduce((sum, post) => sum + post.count, 0);
	}
</script>

<div class="container mx-auto max-w-7xl p-4">
	<div class="mb-6 rounded-lg bg-white p-6 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">Instagram Hashtag Counter</h1>
		<form on:submit|preventDefault={handleSubmit} class="flex gap-2">
			<input
				type="text"
				bind:value={hashtagInput}
				placeholder="해시태그를 쉼표(,)로 구분하여 입력하세요"
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

	{#if totalCount > 0}
		<div class="mb-6 rounded-lg bg-white p-6 shadow-md">
			<div class="flex items-center gap-2">
				<span class="text-lg font-semibold">
					총 게시물 수: {totalCount.toLocaleString()}개
				</span>
			</div>
		</div>
	{/if}

	{#each posts as post}
		<div class="mb-6 rounded-lg bg-white shadow-md">
			<div class="border-b p-6">
				<h2 class="flex items-center gap-2 text-xl font-semibold">
					#{post.hashtag}
					<span class="text-sm font-normal text-gray-500">
						({post.count.toLocaleString()}개)
					</span>
				</h2>
			</div>
			<div class="p-6">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each post.posts as item}
						<div class="overflow-hidden rounded-lg bg-white shadow-md">
							<a
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								class="block transition-opacity hover:opacity-90"
							>
								<div class="relative aspect-square bg-gray-100">
									<img src={item.imageUrl} alt={item.content} class="h-full w-full object-cover" />
								</div>
								<div class="p-3">
									<p class="line-clamp-2 text-sm">{item.content}</p>
									<div class="mt-2 flex items-center justify-between text-sm text-gray-500">
										<span>❤️ {item.likes}</span>
										<span>💬 {item.comments}</span>
									</div>
								</div>
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	:global(body) {
		background-color: #f5f5f5;
	}
</style>
