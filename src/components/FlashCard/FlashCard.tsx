import { useState } from "react";

type FlashCardProps = {
  card: {
    question: string;
    answer: string;
  };
};

export function FlashCard({ card }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="h-96 w-64 cursor-pointer [perspective:1000px]"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg [backface-visibility:hidden]">
          <p className="text-center text-lg font-medium">{card.question}</p>
        </div>
        <div className="absolute flex h-full w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-100 p-4 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-center text-lg font-medium">{card.answer}</p>
        </div>
      </div>
    </div>
  );
}
