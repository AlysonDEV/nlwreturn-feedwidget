import { useState } from "react"

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackTypeContentStep } from "./Steps/FeedbackTypeContentStep"
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep"

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  },
}

export type feedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null)
  const [isFeedbackSent, setIsFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setIsFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      { isFeedbackSent ? (
        <FeedbackSuccessStep 
          onFeedbackRestartRequest={handleRestartFeedback} 
        /> ) : 
        (
          <>
            {!feedbackType ? (
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ): (
              <FeedbackTypeContentStep 
                feedbackType={feedbackType} 
                onFeedbackRestartRequest={handleRestartFeedback} 
                onFeedbackSent={() => setIsFeedbackSent(true)}
              />
            )}
          </>
        )
      }

      <footer className="text-xs text-neutral-400 ">
        Feito com ♥ pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
      </footer>

    </div>
  )
}