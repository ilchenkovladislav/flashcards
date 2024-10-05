import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlashCard } from "@/components/FlashCard";
import { Controls } from "@/components/Controls";

type FlashCardData = {
  id: number;
  question: string;
  answer: string;
};

const flashcards: FlashCardData[] = [
  {
    id: 1,
    question: "Что такое React?",
    answer:
      "React - это js библиотека для создания пользовательских интерфейсов",
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
];

export default function FlashCardApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean[]>(
    new Array(flashcards.length).fill(false),
  );

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length,
    );
  };

  const handleAnswer = (isCorrect: boolean) => {
    setAnsweredCorrectly((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentCardIndex] = isCorrect;
      return newAnswers;
    });
    handleNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCardIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <FlashCard card={flashcards[currentCardIndex]} />
        </motion.div>
      </AnimatePresence>
      <Controls
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCorrect={() => handleAnswer(true)}
        onIncorrect={() => handleAnswer(false)}
      />
      <div className="mt-4 text-lg font-semibold">
        {currentCardIndex + 1} / {flashcards.length}
      </div>
    </div>
  );
}
