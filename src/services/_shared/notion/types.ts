import { CreatePageParameters, PageObjectResponse } from '@notionhq/client';

export type NotionPropertyName = string;
export type NotionProperties = CreatePageParameters['properties'];
export type PropertyValue = PageObjectResponse['properties'][string];
