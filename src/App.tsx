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
      "React — это библиотека JavaScript для создания пользовательских интерфейсов, разработанная Facebook. Она позволяет создавать компоненты, которые управляют своим состоянием и рендерятся в зависимости от этого состояния.",
  },
  {
    id: 2,
    question: "Что такое компонент в React?",
    answer:
      "Компонент в React — это независимый и переиспользуемый блок кода, который инкапсулирует логику и разметку. Компоненты могут быть функциональными или классовыми.",
  },
  {
    id: 3,
    question: "Какое отличие между функциональными и классовыми компонентами?",
    answer:
      "Функциональные компоненты — это простые функции, которые принимают props и возвращают JSX. Классовые компоненты — это классы, которые могут иметь состояние и методы жизненного цикла.",
  },
  {
    id: 4,
    question: "Что такое состояние (state) в React?",
    answer:
      "Состояние (state) — это объект, который хранит динамические данные компонента и определяет его поведение. Изменения состояния приводят к повторному рендерингу компонента.",
  },
  {
    id: 5,
    question: "Как передать данные от родительского компонента к дочернему?",
    answer:
      "Данные передаются от родительского компонента к дочернему через props. Props — это объект, содержащий все атрибуты, переданные компоненту.",
  },
  {
    id: 6,
    question: "Что такое JSX?",
    answer:
      "JSX — это расширение синтаксиса JavaScript, которое позволяет писать HTML-подобный код внутри JavaScript. Он используется в React для описания пользовательского интерфейса.",
  },
  {
    id: 7,
    question: "Как работает виртуальный DOM в React?",
    answer:
      "Виртуальный DOM — это легковесная копия реального DOM. React использует его для оптимизации обновлений, сравнивая текущую и предыдущую версии виртуального DOM и обновляя только измененные элементы в реальном DOM.",
  },
  {
    id: 8,
    question: "Что такое хуки (hooks) в React?",
    answer:
      "Хуки — это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах. Примеры хуков: useState, useEffect, useContext.",
  },
  {
    id: 9,
    question: "Как управлять побочными эффектами в React?",
    answer:
      "Для управления побочными эффектами в React используется хук useEffect. Он позволяет выполнять побочные эффекты, такие как загрузка данных, подписки или изменения DOM, после рендеринга компонента.",
  },
  {
    id: 10,
    question: "Что такое контекст (Context) в React?",
    answer:
      "Контекст (Context) — это способ передачи данных через дерево компонентов без необходимости передавать props на каждом уровне. Он используется для глобальных данных, таких как текущий пользователь или тема.",
  },

  {
    id: 11,
    question: "Что такое Redux и как он связан с React?",
    answer:
      "Redux — это библиотека для управления состоянием приложения. Она часто используется с React для централизованного управления состоянием, что упрощает передачу данных между компонентами.",
  },
  {
    id: 12,
    question: "Как использовать useState в React?",
    answer:
      "useState — это хук, который позволяет добавлять состояние в функциональные компоненты. Вызывается с начальным значением состояния и возвращает массив с текущим значением состояния и функцией для его обновления.",
  },
  {
    id: 13,
    question: "Что такое useEffect и когда его использовать?",
    answer:
      "useEffect — это хук, который позволяет выполнять побочные эффекты в функциональных компонентах. Он используется для операций, таких как загрузка данных, подписка на события или изменение DOM.",
  },
  {
    id: 14,
    question: "Как работает useContext?",
    answer:
      "useContext — это хук, который позволяет использовать контекст в функциональных компонентах. Он принимает объект контекста и возвращает текущее значение контекста.",
  },
  {
    id: 15,
    question: "Что такое React Router?",
    answer:
      "React Router — это библиотека для маршрутизации в React-приложениях. Она позволяет создавать одностраничные приложения с навигацией без перезагрузки страницы.",
  },
  {
    id: 16,
    question: "Как оптимизировать производительность React-приложения?",
    answer:
      "Для оптимизации производительности можно использовать мемоизацию компонентов с помощью React.memo, хуки useMemo и useCallback, а также избегать ненужных рендеров и использовать динамическую загрузку компонентов.",
  },
  {
    id: 17,
    question: "Что такое PropTypes?",
    answer:
      "PropTypes — это библиотека для проверки типов props в React-компонентах. Она помогает убедиться, что компоненты получают props нужного типа и формата.",
  },
  {
    id: 18,
    question: "Как использовать фрагменты в React?",
    answer:
      "Фрагменты позволяют группировать список дочерних элементов без добавления дополнительных узлов в DOM. Используются с помощью <React.Fragment> или сокращенной записи <>.</>",
  },
  {
    id: 19,
    question: "Что такое серверный рендеринг (SSR) в React?",
    answer:
      "Серверный рендеринг (SSR) — это процесс рендеринга React-компонентов на сервере, а не в браузере. Это улучшает SEO и время загрузки страницы.",
  },
  {
    id: 20,
    question:
      "Как использовать React.lazy для динамической загрузки компонентов?",
    answer:
      "React.lazy позволяет загружать компоненты по требованию, что уменьшает размер начальной загрузки приложения. Используется вместе с Suspense для отображения запасного контента, пока компонент загружается.",
  },
  {
    id: 21,
    question: "Что такое HOC (Higher-Order Component) в React?",
    answer:
      "HOC (Higher-Order Component) — это функция, которая принимает компонент и возвращает новый компонент. Он используется для повторного использования логики между компонентами.",
  },
  {
    id: 22,
    question: "Как работает useReducer в React?",
    answer:
      "useReducer — это хук, который используется для управления сложным состоянием в функциональных компонентах. Он принимает редьюсер и начальное состояние и возвращает текущее состояние и функцию dispatch.",
  },
  {
    id: 23,
    question: "Что такое React.memo и когда его использовать?",
    answer:
      "React.memo — это HOC, который предотвращает повторный рендеринг компонента, если его props не изменились. Используется для оптимизации производительности.",
  },
  {
    id: 24,
    question: "Как использовать useRef в React?",
    answer:
      "useRef — это хук, который возвращает изменяемый ref-объект. Он используется для доступа к DOM-элементам или сохранения любого мутируемого значения, которое не вызывает повторный рендеринг при изменении.",
  },
  {
    id: 25,
    question: "Что такое Suspense в React?",
    answer:
      "Suspense — это компонент, который позволяет показывать запасной контент (например, индикатор загрузки) во время ожидания загрузки асинхронных данных или компонентов.",
  },
  {
    id: 26,
    question: "Как работает Concurrent Mode в React?",
    answer:
      "Concurrent Mode — это набор новых возможностей в React, которые помогают приложениям оставаться отзывчивыми и плавными, откладывая менее важные задачи и позволяя более важным задачам прерывать менее важные.",
  },
  {
    id: 27,
    question: "Что такое React Fiber?",
    answer:
      "React Fiber — это новая архитектура внутреннего механизма рендеринга React, которая улучшает его способность к согласованию и делает возможными такие функции, как Concurrent Mode.",
  },
  {
    id: 28,
    question: "Как использовать useCallback в React?",
    answer:
      "useCallback — это хук, который возвращает мемоизированную версию функции, которая изменяется только при изменении одной из зависимостей. Используется для оптимизации производительности.",
  },
  {
    id: 29,
    question: "Что такое Error Boundaries в React?",
    answer:
      "Error Boundaries — это компоненты, которые ловят ошибки JavaScript в любом месте их дочернего дерева компонентов, логируют их и отображают запасной UI вместо сломанного дерева компонентов.",
  },
  {
    id: 30,
    question: "Как использовать useLayoutEffect в React?",
    answer:
      "useLayoutEffect — это хук, который запускается синхронно после всех изменений DOM. Используется для операций, которые должны произойти после того, как DOM был изменен, но до того, как браузер отобразит изменения.",
  },

  {
    id: 31,
    question: "Как использовать useImperativeHandle в React?",
    answer:
      "useImperativeHandle — это хук, который позволяет настраивать значение экземпляра, которое предоставляется родительским компонентам при использовании ref. Он используется в сочетании с forwardRef.",
  },
  {
    id: 32,
    question: "Что такое React.StrictMode?",
    answer:
      "React.StrictMode — это инструмент для выявления потенциальных проблем в приложении. Он активирует дополнительные проверки и предупреждения для своих дочерних компонентов.",
  },
  {
    id: 33,
    question: "Как работает forwardRef в React?",
    answer:
      "forwardRef — это функция, которая позволяет передавать ref через компонент к одному из его дочерних компонентов. Это полезно для интеграции с DOM-элементами или сторонними библиотеками.",
  },
  {
    id: 34,
    question: "Что такое React Portals?",
    answer:
      "React Portals позволяют рендерить дочерние элементы в DOM-узел, который существует вне иерархии DOM родительского компонента. Это полезно для модальных окон и всплывающих подсказок.",
  },
  {
    id: 35,
    question: "Как использовать useTransition в React?",
    answer:
      "useTransition — это хук, который позволяет создавать переходы между состояниями, которые не блокируют пользовательский интерфейс. Он используется для создания плавных анимаций и переходов.",
  },
  {
    id: 36,
    question: "Что такое useDeferredValue в React?",
    answer:
      "useDeferredValue — это хук, который позволяет откладывать обновление значения до тех пор, пока не будет завершена более важная работа. Это помогает избежать задержек в пользовательском интерфейсе.",
  },
  {
    id: 37,
    question: "Как работает useId в React?",
    answer:
      "useId — это хук, который генерирует уникальные идентификаторы для компонентов. Это полезно для обеспечения уникальности атрибутов id в HTML, особенно при рендеринге списков.",
  },
  {
    id: 38,
    question: "Что такое React DevTools?",
    answer:
      "React DevTools — это расширение для браузера, которое позволяет разработчикам инспектировать структуру компонентов React, отслеживать состояние и props, а также выявлять проблемы в приложении.",
  },
  {
    id: 39,
    question: "Как использовать useSyncExternalStore в React?",
    answer:
      "useSyncExternalStore — это хук, который позволяет подписываться на внешние источники данных и синхронизировать их с состоянием компонента. Это полезно для интеграции с глобальными состояниями или сторонними библиотеками.",
  },
  {
    id: 40,
    question: "Что такое useInsertionEffect в React?",
    answer:
      "useInsertionEffect — это хук, который позволяет выполнять эффекты, которые должны быть вставлены в DOM перед любыми другими изменениями. Это полезно для вставки стилей или скриптов.",
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
