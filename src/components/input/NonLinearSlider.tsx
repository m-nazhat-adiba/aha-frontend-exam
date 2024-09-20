import React, { useCallback, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  sliderMarks: number[];
  setSliderValue: (value: number) => void;
  generateMarks?: (sliderMarks: number[]) => { value: number; label: string }[];
  valueToLabel?: (
    marks: { value: number; label: string }[],
    value: number,
  ) => number;
}

const defaultGenerateMarks = (sliderMarks: number[]) => {
  const marks = [];
  for (let i = 0; i < sliderMarks.length; i++) {
    if (i < sliderMarks.length - 1) {
      marks.push({ value: i * 2, label: `${sliderMarks[i]}` });
    } else {
      marks.push({
        value: sliderMarks.length * 2,
        label: `${sliderMarks[i]}`,
      });
    }
  }
  return marks;
};

const defaultLabelToValue = (
  marks: { value: number; label: string }[],
  label: number,
) => {
  const marksLength = marks.length;
  const stringLabel = `${label}`;
  let resolvedValue = 0;

  for (let i = 0; i < marksLength; i++) {
    if (stringLabel === marks[i].label) {
      resolvedValue = marks[i].value;
    }
  }
  return resolvedValue;
};

const defaultValueToLabel = (
  marks: { value: number; label: string }[],
  value: number,
) => {
  if (marks.length < 2) {
    return value;
  }

  if (value <= marks[marks.length - 2].value) {
    const resolvedIndex = Math.floor(value / 2);
    return parseFloat(marks[resolvedIndex]?.label || "0");
  } else {
    const baseLabelValue = parseFloat(marks[marks.length - 2].label);
    const maxLabelValue = parseFloat(marks[marks.length - 1].label);
    const baseValue = marks[marks.length - 2].value;
    const maxValue = marks.length * 2;

    const valueResultant = maxValue - baseValue;
    const labelValueResultant = maxLabelValue - baseLabelValue;
    const resolvedValue = Math.floor(
      baseLabelValue +
        ((value - baseValue) / valueResultant) * labelValueResultant,
    );

    return resolvedValue;
  }
};

// Component
function NonLinearSlider({
  sliderMarks,
  setSliderValue,
  generateMarks = defaultGenerateMarks,
  valueToLabel = defaultValueToLabel,
}: Props) {
  const [marks, setMarks] = useState<{ value: number; label: string }[]>([]);
  const [val, setVal] = useState<number>(0);

  const reduxPageSize = useSelector(
    (state: RootState) => state.search.pageSize,
  );

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const resolvedValue = newValue as number;
      const snapValue = () => {
        return resolvedValue % 2 === 0 ? resolvedValue : resolvedValue + 1;
      };
      const finalValue =
        resolvedValue <= marks[marks.length - 2].value
          ? snapValue()
          : resolvedValue;

      setVal(finalValue);
      setSliderValue(valueToLabel(marks, finalValue));
    },
    [marks, setSliderValue, valueToLabel],
  );

  useEffect(() => {
    setMarks(generateMarks(sliderMarks));
  }, [generateMarks, sliderMarks]);

  useEffect(() => {
    setVal(defaultLabelToValue(marks, reduxPageSize));
  }, [marks]);

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
}

export default NonLinearSlider;
