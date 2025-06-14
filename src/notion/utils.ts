import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client';

export const getTitleText = (property: PageObjectResponse['properties'][string] | undefined) => {
  if (property == null || property.type !== 'title') {
    return '';
  }
  return property.title[0]?.plain_text ?? '';
};
