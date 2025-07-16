import type {
	BlockObjectResponse,
	CreatePageParameters,
	DatabaseObjectResponse,
	PageObjectResponse,
	QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';

const getRequestHeader = (token: string) => ({
	Authorization: `Bearer ${token}`,
	'Content-Type': 'application/json',
	'Notion-Version': '2022-06-28',
});

export const createNotionClient = (token: string) => ({
	getPages: (
		databaseId: string,
		data: Omit<QueryDatabaseParameters, 'database_id'>,
	): { results: PageObjectResponse[] } => {
		const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

		const result = UrlFetchApp.fetch(queryUrl, {
			method: 'post',
			headers: getRequestHeader(token),
			payload: JSON.stringify(data),
		});

		return JSON.parse(result.getContentText());
	},
	getRecentPage: function (databaseId: string): PageObjectResponse | null {
		// created_time 기준 내림차순, 1개만 반환
		const result = this.getPages(databaseId, {
			sorts: [{ timestamp: 'created_time', direction: 'descending' }],
			page_size: 1,
		});

		return result.results[0] ?? null;
	},
	updateAll: (updates: { pageId: string; data: unknown }[]) => {
		if (updates.length === 0) {
			return [];
		}

		const requests = updates.map(({ pageId, data }) => ({
			url: `https://api.notion.com/v1/pages/${pageId}`,
			method: 'patch' as const,
			headers: getRequestHeader(token),
			payload: JSON.stringify(data),
		}));

		const results = UrlFetchApp.fetchAll(requests);
		return results.map((result) => JSON.parse(result.getContentText()));
	},
	createPage: (
		databaseId: string,
		properties: CreatePageParameters['properties'],
	) => {
		const url = 'https://api.notion.com/v1/pages';
		const result = UrlFetchApp.fetch(url, {
			method: 'post',
			headers: getRequestHeader(token),
			payload: JSON.stringify({
				parent: { database_id: databaseId },
				properties,
			}),
		});

		return JSON.parse(result.getContentText());
	},
	findDatabaseByName: (name: string, token: string) => {
		const queryUrl = 'https://api.notion.com/v1/search';

		const result = UrlFetchApp.fetch(queryUrl, {
			method: 'post',
			payload: JSON.stringify({
				query: name,
				filter: { property: 'object', value: 'database' },
			}),
			headers: {
				...getRequestHeader(token),
				Authorization: `Bearer ${token}`,
			},
		});

		const response = JSON.parse(result.getContentText()) as {
			results: DatabaseObjectResponse[];
		};

		if (response.results) {
			response.results = response.results.filter((db) => {
				const titleProperty = db.title[0];
				return titleProperty?.plain_text === name;
			});
		}

		return response;
	},

	deleteAllPagesInDatabase: (databaseId: string): number => {
		const queryUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;
		const result = UrlFetchApp.fetch(queryUrl, {
			method: 'post',
			headers: getRequestHeader(token),
			payload: JSON.stringify({}),
		});

		const { results } = JSON.parse(result.getContentText());

		Logger.log(
			`${databaseId} 테이블에서 ${results.length}개의 Row를 발견했어요.`,
		);
		if (!results || results.length === 0) return 0;

		const requests = results.map((page: { id: string }) => ({
			url: `https://api.notion.com/v1/pages/${page.id}`,
			method: 'patch' as const,
			headers: getRequestHeader(token),
			payload: JSON.stringify({ archived: true }),
		}));
		UrlFetchApp.fetchAll(requests);
		return results.length;
	},
	getBlockChildren: (blockId: string): BlockObjectResponse[] => {
		const url = `https://api.notion.com/v1/blocks/${blockId}/children`;
		const result = UrlFetchApp.fetch(url, {
			method: 'get',
			headers: getRequestHeader(token),
		});
		return JSON.parse(result.getContentText()).results;
	},
	updateBlock: (blockId: string, data: object) => {
		const url = `https://api.notion.com/v1/blocks/${blockId}`;
		const result = UrlFetchApp.fetch(url, {
			method: 'patch',
			headers: getRequestHeader(token),
			payload: JSON.stringify(data),
		});
		return JSON.parse(result.getContentText());
	},
	findBlockRecursively: function (
		blocks: BlockObjectResponse[],
		predicate: (
			block: BlockObjectResponse,
			idx: number,
			arr: BlockObjectResponse[],
		) => boolean,
	): {
		block: BlockObjectResponse;
		index: number;
		parentBlocks: BlockObjectResponse[];
	} | null {
		for (let i = 0; i < blocks.length; i++) {
			const block = blocks[i];
			if (predicate(block, i, blocks)) {
				return { block, index: i, parentBlocks: blocks };
			}

			if (block.has_children) {
				const children = this.getBlockChildren(block.id);
				const found = this.findBlockRecursively(children, predicate);

				if (found) {
					return found;
				}
			}
		}
		return null;
	},
});
