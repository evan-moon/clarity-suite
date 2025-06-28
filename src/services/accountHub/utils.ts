import { SNAPSHOT_PROPERTY_MAP } from './constants';
import { NotionProperties, PropertyValue } from './\btypes';

export function formatYYYYMM(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

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

const typeHandlers: Record<string, (value: PropertyValue) => any> = {
  number: handleNumber,
  select: handleSelect,
  multi_select: handleMultiSelect,
  relation: handleRelation,
  formula: handleFormula,
  rollup: handleRollup,
  checkbox: handleCheckbox,
  rich_text: handleRichText,
};

export function buildSnapshotProperties(
  properties: Record<string, PropertyValue>,
  pageId: string,
  now: Date
): NotionProperties {
  const snapshotProperties = Object.entries(SNAPSHOT_PROPERTY_MAP).reduce((acc, [snapshotKey, infoKey]) => {
    const value = properties[infoKey];
    if (!value) return acc;
    const handler = typeHandlers[value.type];
    if (handler) {
      const result = handler(value);
      if (result !== undefined) acc[snapshotKey] = result;
    }
    return acc;
  }, {} as NotionProperties);
  Logger.log(snapshotProperties);

  return {
    ...snapshotProperties,
    'Account Info': { relation: [{ id: pageId }] },
    Date: { date: { start: now.toISOString().split('T')[0] } },
    ID: { title: [{ type: 'text', text: { content: formatYYYYMM(now) } }] },
  };
}
