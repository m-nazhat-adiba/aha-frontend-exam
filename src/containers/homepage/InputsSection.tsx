/**
 * @fileoverview A section component that includes input fields and a non-linear slider for search functionality.
 *
 * This component allows users to enter a keyword to search and select the number of results per page using a slider.
 * It utilizes Redux for state management to handle input values and trigger search actions.
 *
 * @returns The rendered InputsSection component containing input fields and a slider for search functionality.
 */

import { BasicButton } from '@/components/button/BasicButton';
import { InputField } from '@/components/input/InputField';
import { NonLinearSlider } from '@/components/input/NonLinearSlider';
import {
  setKeyword,
  setPageSize,
  setSearchTrigger,
} from '@/lib/features/SearchSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';

export const InputsSection = () => {
  const inputValue = useSelector((state: RootState) => state.search.keyword);
  const sliderValue = useSelector((state: RootState) => state.search.pageSize);
  const marks = [3, 6, 9, 12, 15, 50];

  const dispatch = useDispatch();

  const handleSliderChange = (value: number) => {
    dispatch(setPageSize(value));
  };

  const handleSearch = () => {
    dispatch(setSearchTrigger(true));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(setKeyword(event.target.value));
  };

  return (
    <div className="flex h-full w-full translate-x-0 flex-col items-start px-5 pt-0 lg:translate-x-[80px] lg:px-[130px] lg:pt-[58px]">
      <div className="block h-[88px] w-full lg:hidden">
        <div className="mb-2 flex h-[88px] w-full">
          <span className="flex items-center justify-center bg-gradient-to-r from-[#FFD25F] to-[#FF5C01] bg-clip-text text-[13px] font-bold leading-[14.94] text-transparent">
            LOGO
          </span>
        </div>
      </div>
      <form className="w-full">
        <label
          htmlFor="search-field"
          className="mb-5 block text-2xl font-light"
        >
          Search
        </label>
        <InputField
          inputId="search-field"
          placeholder="Keyword"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
      <div className="mt-7 hidden w-[725px] border border-solid border-[#302E30] lg:flex"></div>
      <div className="flex w-full flex-col">
        <p className="pb-6 pt-7 text-2xl font-light"># Of results per page</p>
        <div className="flex flex-row items-center gap-[10px]">
          <span className="text-5xl font-bold">{sliderValue}</span>
          <span className="text-base">result</span>
        </div>
        <div className="w-full pt-5">
          <NonLinearSlider
            sliderMarks={marks}
            setSliderValue={handleSliderChange}
          />
        </div>
      </div>

      <div className="mb-[66px] flex w-full flex-grow flex-col justify-end gap-4 pb-6 lg:mb-[87px] lg:w-[343px] lg:pb-0">
        <BasicButton onClick={handleSearch}>BUTTON</BasicButton>
      </div>
    </div>
  );
};
