import { isFullPage, PageObjectResponse } from '@notionhq/client';

export const getTitleText = (property: PageObjectResponse['properties'][string] | undefined) => {
  if (property == null || property.type !== 'title') {
    return '';
  }
  return property.title[0]?.plain_text ?? '';
};

export const isFullPageWithId = (page: PageObjectResponse): page is PageObjectResponse & { id: string } => {
  return isFullPage(page);
};
