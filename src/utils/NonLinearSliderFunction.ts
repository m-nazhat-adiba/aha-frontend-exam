/**
 * @fileoverview Utility functions for generating marks and converting between labels and values for a slider component.
 */

/**
 * Generates marks for a slider based on the provided array of labels.
 *
 * @param sliderMarks - An array of labels to be used for the slider marks.
 * @returns An array of objects containing the generated marks with corresponding values.
 *
 * @example
 * const marks = defaultGenerateMarks([10, 20, 30]);
 * // Output: [{ value: 0, label: 10 }, { value: 2, label: 20 }, { value: 4, label: 30 }]
 */
export function defaultGenerateMarks(
  sliderMarks: number[],
): Array<{ value: number; label: number }> {
  return sliderMarks.map((mark, i) => ({
    value: i < sliderMarks.length - 1 ? i * 2 : sliderMarks.length * 2,
    label: mark,
  }));
}

/**
 * Converts a label to its corresponding value based on the provided marks.
 *
 * @param marks - An array of mark objects containing value-label pairs.
 * @param label - The label to be converted to a value.
 * @returns The corresponding value for the given label, or 0 if not found.
 *
 * @example
 * const marks = [{ value: 0, label: 10 }, { value: 2, label: 20 }];
 * const value = defaultLabelToValue(marks, 20);
 * // Output: 2
 */

export function defaultLabelToValue(
  marks: { value: number; label: number }[],
  label: number,
): number {
  const mark = marks.find((mark) => mark.label === label);
  return mark ? mark.value : 0;
}

/**
 * Converts a value to its corresponding label based on the provided marks.
 *
 * @param marks - An array of mark objects containing value-label pairs.
 * @param  value - The value to be converted to a label.
 * @returns The corresponding label for the given value.
 *
 * @example
 * const marks = [{ value: 0, label: 10 }, { value: 2, label: 20 }];
 * const label = defaultValueToLabel(marks, 1);
 * // Output: 10
 */
export function defaultValueToLabel(
  marks: { value: number; label: number }[],
  value: number,
): number {
  if (marks.length < 2) {
    return value;
  }

  const mark = marks.find((mark) => mark.value === value);
  return mark ? mark.label : 0;
}
