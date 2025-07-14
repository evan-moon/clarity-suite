export type ScriptPropertyKeys = string;
export type PropertyKeyInSpreadSheet = string;

export interface SettingConfig {
	SHEET_NAME: string;
	SCRIPT_PROPERTIES_MAP: Record<PropertyKeyInSpreadSheet, ScriptPropertyKeys>;
	DATABASE_PROPERTIES: ScriptPropertyKeys[];
}
