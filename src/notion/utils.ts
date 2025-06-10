import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client';

export const getTitleText = (property: PageObjectResponse['properties'][string]) => {
  if (property.type === 'title') {
    return property.title[0].plain_text;
  } else {
    return '';
  }
};
