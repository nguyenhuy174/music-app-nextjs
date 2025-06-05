"use client";

import * as RadixSlider from '@radix-ui/react-slider';

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SlideProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 1,
  step = 0.1,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-10
        cursor-pointer
      "
      value={[value]}
      onValueChange={handleChange}
      min={min}
      max={max}
      step={step}
      aria-label="Slider"
    >
      <RadixSlider.Track
        className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[3px]
        "
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-white 
            rounded-full 
            h-full
          "
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
