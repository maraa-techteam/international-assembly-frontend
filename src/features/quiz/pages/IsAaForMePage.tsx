'use client'

import { Button, Icon, LinkComponent, Typography } from '@/common/components'
import { Grid, Section } from '@/common/layouts'
import { useState } from 'react'

import { quizQuestions } from '../data/questions'

type QuizState = 'intro' | 'quiz' | 'result'

export function IsAaForMePage() {
  const [quizState, setQuizState] = useState<QuizState>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(quizQuestions.length).fill(null),
  )

  const totalQuestions = quizQuestions.length
  const question = quizQuestions[currentQuestion]
  const currentAnswer = answers[currentQuestion]
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const score = answers.filter((a) => a === true).length

  function startQuiz() {
    setCurrentQuestion(0)
    setAnswers(Array(quizQuestions.length).fill(null))
    setQuizState('quiz')
  }

  function handleAnswer(answer: boolean) {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = answer
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      setQuizState('result')
    } else {
      goForward()
    }
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  function goForward() {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <Section color='white' className='max-w-300 items-start gap-6'>
      {quizState === 'intro' && (
        <>
          <Typography variant='h1' font='roboto'>
            Подходит ли мне АА?
          </Typography>
          <div className='flex flex-col gap-4'>
            <Typography variant='body'>
              Только вы можете решить, стоит ли вам прийти в АА - может ли это
              вам помочь.
            </Typography>
            <Typography variant='body'>
              Мы же пришли в АА потому что, в конце концов, отказались от
              попыток контролировать свою выпивку. Нам очень не хотелось
              признать тот факт что мы никогда не сможем пить «нормально». Но от
              других членов АА мы узнали, что мы просто больные люди (Да мы и
              сами уже давно об этом догадывались!) Мы обнаружили, что очень
              много людей, так же как и мы страдают от чувства вины, одиночества
              и безнадежности. Мы узнали, что эти чувства были вызваны болезнью
              — алкоголизмом.
            </Typography>
            <Typography variant='body'>
              Для того, чтобы получить ответ на ваш вопрос вы должны ответить
              честно на следующие 12 вопросов: ДА или НЕТ
            </Typography>
          </div>
          <Button
            variant='contained'
            color='primary'
            size='lg'
            className='group w-full gap-3 lg:max-w-75'
            onClick={startQuiz}
          >
            <Typography variant='caption' className='font-medium' font='roboto'>
              Начать
            </Typography>
            <Icon
              icon='arrow-right'
              className='transition-transform duration-300 ease-in-out group-hover:translate-x-1'
              size='md'
            />
          </Button>
        </>
      )}

      {quizState === 'quiz' && (
        <>
          <div className='flex w-full items-center justify-between gap-4'>
            <Typography variant='caption' className='font-medium'>
              Вопрос {currentQuestion + 1}/{totalQuestions}
            </Typography>
            <div className='flex gap-2'>
              <button
                disabled={currentQuestion === 0}
                onClick={goBack}
                className='cursor-pointer p-1 disabled:cursor-not-allowed disabled:opacity-30'
              >
                <Icon icon='arrow-left' size='md' className='text-foreground' />
              </button>
              <button
                disabled={currentAnswer === null || isLastQuestion}
                onClick={goForward}
                className='cursor-pointer p-1 disabled:cursor-not-allowed disabled:opacity-30'
              >
                <Icon icon='arrow-left' size='md' className='rotate-180' />
              </button>
            </div>
          </div>

          <Typography variant='h2' font='roboto'>
            {question.question}
          </Typography>

          <Typography variant='body'>{question.description}</Typography>

          <Grid as='div' className='lg:flex lg:flex-row' columns={2}>
            <Button
              variant={currentAnswer === true ? 'contained' : 'outlined'}
              color='primary'
              size='lg'
              className='w-full lg:max-w-75'
              onClick={() => handleAnswer(true)}
            >
              Да
            </Button>
            <Button
              variant={currentAnswer === false ? 'contained' : 'outlined'}
              color='primary'
              size='lg'
              className='w-full lg:max-w-75'
              onClick={() => handleAnswer(false)}
            >
              Нет
            </Button>
          </Grid>
        </>
      )}

      {quizState === 'result' && (
        <>
          <Typography variant='h1' font='roboto'>
            Подходит ли мне АА?
          </Typography>

          <div className='flex flex-col gap-4'>
            <Typography variant='body'>
              <strong>
                Ваш результат:{' '}
                <span
                  className={score >= 4 ? 'text-red-500' : 'text-green-600'}
                >
                  {score}
                </span>{' '}
                ответов "ДА"
              </strong>
              .
            </Typography>
            <Typography variant='body'>
              Вы ответили ДА на четыре или более вопросов? Если так, то вы,
              вероятно, попали в беду. Почему мы так считаем? Потому что об этом
              говорили тысячи людей в АА в течение многих лет.
            </Typography>
            <Typography variant='body'>
              И все же только ВЫ можете решить, нужно ли вам АА. Попытайтесь
              подойти к этому непредвзято. Если вы скажете ДА, мы будем рады
              показать вам, как мы сами бросили пить. Просто приходите.
            </Typography>
            <Typography variant='body'>
              АА не обещает решить все ваши жизненные проблемы. Но мы можем
              показать вам, как мы научились жить без выпивки «по одному дню».
            </Typography>
          </div>
          <LinkComponent
            icon='telegram'
            isUnderlined
            color='primary'
            text='Связаться с сообществом'
            href='https://t.me/@QSAAbot'
            variant='icon-left'
          />
          <Grid as='nav' className='lg:flex lg:flex-row'>
            <Button
              variant='outlined'
              color='primary'
              size='lg'
              as='link'
              href='/groups'
            >
              Найти группу
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='lg'
              as='link'
              href='/start-the-journey'
            >
              Начать путь
            </Button>
          </Grid>
        </>
      )}
    </Section>
  )
}
