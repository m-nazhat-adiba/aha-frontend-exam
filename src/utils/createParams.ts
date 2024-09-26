/**
 * @description Creates a URL query parameter string from a given name and value.
 *
 * This utility function helps to create URL-encoded query parameters,
 * which can be appended to a URL for search or filter functionality.
 *
 * @param name - The name of the query parameter.
 * @param value - The value associated with the query parameter.
 *
 * @returns The URL-encoded query parameter string.
 */

export function createParams(name: string, value: number | string) {
  const params = new URLSearchParams();
  params.set(name, value.toString());

  return params.toString();
}
