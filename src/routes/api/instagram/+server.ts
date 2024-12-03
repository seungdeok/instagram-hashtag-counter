import { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD, INSTAGRAM_NAME } from '$env/static/private';
import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

const instagramCrawl = async () => {
	const browser = await puppeteer.launch({
		headless: true
	});
	const page = await browser.newPage();

	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
	);
	await page.evaluate('navigator.userAgent');
	const request = await page.goto(`https://www.instagram.com`, {
		waitUntil: 'networkidle2'
	});

	if (request === null || request.status() === 404) {
		browser.close();
		console.log('This account is not exist');
		return 'This account is not exist';
	} else if (request.status() == 429) {
		browser.close();
		console.log('Too many requests');
		return 'Too many requests';
	} else {
		await page.type('input[name="username"]', INSTAGRAM_USERNAME);
		await page.type('input[name="password"]', INSTAGRAM_PASSWORD);
		await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()]);
		await page.goto(`https://www.instagram.com/${INSTAGRAM_NAME}/channel`, {
			waitUntil: 'networkidle2'
		});
		const spans = await page.$$('span');
		for (const span of spans) {
			const text = await span.evaluate((el) => el.textContent);
			if (text && text.includes('검색')) {
				await span.click();
				break;
			}
		}
		await page.type('input[aria-label="입력 검색"]', '#함안낙화놀이');
		const text = await page.$eval('span', (el) => {
			if (el.textContent?.startsWith('게시물')) {
				return el.textContent;
			}
			return null;
		});

		return text;
	}
};

export async function POST() {
	const count = await instagramCrawl();
	return json({ data: { count } });
}
