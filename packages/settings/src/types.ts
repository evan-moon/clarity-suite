export type ScriptPropertyKeys = string;
export type PropertyKeyInSpreadSheet = string;

export interface SettingConfig {
	SCRIPT_PROPERTIES_MAP: Record<PropertyKeyInSpreadSheet, ScriptPropertyKeys>;
	DATABASE_PROPERTIES: ScriptPropertyKeys[];
}
