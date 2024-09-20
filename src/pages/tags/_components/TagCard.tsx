import React from "react";

interface TagCardProps {
  name: string;
  total: number;
}

const TagCard: React.FC<TagCardProps> = ({ name, total }) => {
  return (
    <div className="flex flex-col pb-0 md:pb-3">
      <div className="relative h-[150px] w-[150px] rounded-[10px] bg-[#262626]">
        <div className="absolute bottom-[14px] left-[10px] max-w-[127px] truncate rounded-[8px] border-4 border-solid border-white px-[14px] py-[7px] text-2xl font-bold text-white">
          {name}
        </div>
      </div>
      <div className="max-w-[140px] truncate pb-0 pt-[10px] text-[15px]">
        {name}
      </div>
      <div className="text-[11.7px] text-[#b2b2b2]">{total} Results</div>
    </div>
  );
};

export default TagCard;
