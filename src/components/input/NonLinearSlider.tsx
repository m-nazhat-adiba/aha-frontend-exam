/**
 * @fileoverview A customizable non-linear slider component for selecting values based on predefined marks.
 *
 * This component uses the Material-UI Slider and provides functionalities to handle non-linear scaling of values.
 *
 * @param sliderMarks - An array of marks representing the positions on the slider.
 * @param setSliderValue - A function to update the selected slider value.
 * @param generateMarks - An optional function to generate slider marks. Defaults to `defaultGenerateMarks`.
 * @param valueToLabel - An optional function to convert value to label. Defaults to `defaultValueToLabel`.
 * @returns The rendered non-linear slider component.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  defaultGenerateMarks,
  defaultLabelToValue,
  defaultValueToLabel,
} from '@/helpers/nonLinearSliderFunction';

interface Props {
  sliderMarks: number[];
  setSliderValue: (value: number) => void;
  generateMarks?: (sliderMarks: number[]) => { value: number; label: number }[];
  valueToLabel?: (
    marks: { value: number; label: number }[],
    value: number,
  ) => number;
}

export const NonLinearSlider: React.FC<Props> = ({
  sliderMarks,
  setSliderValue,
  generateMarks = defaultGenerateMarks,
  valueToLabel = defaultValueToLabel,
}) => {
  const [marks, setMarks] = useState<{ value: number; label: number }[]>([]);
  const [val, setVal] = useState<number>(0);

  const reduxPageSize = useSelector(
    (state: RootState) => state.search.pageSize,
  );

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const resolvedValue = newValue as number;
      const snapValue =
        resolvedValue % 2 === 0 ? resolvedValue : resolvedValue + 1;
      const finalValue =
        resolvedValue <= marks[marks.length - 2].value
          ? snapValue
          : marks[marks.length - 1].value;

      setVal(finalValue);
      setSliderValue(valueToLabel(marks, finalValue));
      console.log(valueToLabel(marks, finalValue), 'slider label');
    },
    [marks, setSliderValue, valueToLabel],
  );

  useEffect(() => {
    setMarks(generateMarks(sliderMarks));
  }, [generateMarks, sliderMarks]);

  useEffect(() => {
    setVal(defaultLabelToValue(marks, reduxPageSize));
  }, [marks, reduxPageSize]);

  return (
    <div className="w-full">
      <Slider
        aria-label="Custom marks"
        defaultValue={0}
        getAriaValueText={(value: number) => `${value}`}
        valueLabelDisplay="off"
        step={1}
        marks={marks}
        onChange={handleChange}
        min={0}
        max={sliderMarks.length * 2}
        value={val}
      />
    </div>
  );
};
