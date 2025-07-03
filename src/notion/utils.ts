import { isFullPage, PageObjectResponse } from '@notionhq/client';
import { PropertyValue } from './types';

export const getTitleText = (property: PageObjectResponse['properties'][string] | undefined) => {
  if (property == null || property.type !== 'title') {
    return '';
  }
  return property.title[0]?.plain_text ?? '';
};

export const isFullPageWithId = (page: PageObjectResponse): page is PageObjectResponse & { id: string } => {
  return isFullPage(page);
};

function handleNumber(value: PropertyValue) {
  if (value.type !== 'number') return undefined;
  return { number: value.number };
}
function handleSelect(value: PropertyValue) {
  if (value.type !== 'select') return undefined;
  return { rich_text: [{ type: 'text', text: { content: value.select?.name ?? '' } }] };
}
function handleMultiSelect(value: PropertyValue) {
  if (value.type !== 'multi_select') return undefined;
  const names = value.multi_select?.map(opt => opt.name).join(', ') ?? '';
  return { rich_text: [{ type: 'text', text: { content: names } }] };
}
function handleRelation(value: PropertyValue) {
  if (value.type !== 'relation') return undefined;
  return { relation: value.relation as { id: string }[] };
}
function handleFormula(value: PropertyValue) {
  if (value.type !== 'formula') return undefined;
  switch (value.formula.type) {
    case 'number':
      return { number: value.formula.number };
    case 'string':
      return { rich_text: [{ type: 'text', text: { content: value.formula.string ?? '' } }] };
    case 'boolean':
      return { checkbox: value.formula.boolean ?? false };
    case 'date':
      return { date: value.formula.date };
    default:
      return undefined;
  }
}
function handleRollup(value: PropertyValue) {
  if (value.type !== 'rollup') return undefined;
  switch (value.rollup.type) {
    case 'number':
      return { number: value.rollup.number };
    case 'date':
      return { date: value.rollup.date };
    default:
      return undefined;
  }
}
function handleCheckbox(value: PropertyValue) {
  if (value.type !== 'checkbox') return undefined;
  return { checkbox: value.checkbox };
}
function handleRichText(value: PropertyValue) {
  if (value.type !== 'rich_text') return undefined;
  return { rich_text: value.rich_text };
}

export const convertValueToNotionProperty: Record<string, (value: PropertyValue) => any> = {
  number: handleNumber,
  select: handleSelect,
  multi_select: handleMultiSelect,
  relation: handleRelation,
  formula: handleFormula,
  rollup: handleRollup,
  checkbox: handleCheckbox,
  rich_text: handleRichText,
};
