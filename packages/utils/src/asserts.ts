export function assert<T>(
	variable: T,
	message: string,
): asserts variable is NonNullable<T> {
	if (variable == null) {
		throw new TypeError(message);
	}
}
