import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";

interface ControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function Controls({
  onNext,
  onPrevious,
  onCorrect,
  onIncorrect,
}: ControlsProps) {
  return (
    <div className="mt-4 flex items-center justify-center space-x-4">
      <button
        onClick={onPrevious}
        className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={onIncorrect}
        className="rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        onClick={onCorrect}
        className="rounded-full bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
      >
        <Check className="h-6 w-6" />
      </button>
      <button
        onClick={onNext}
        className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
