import { ContactForm } from '@/common/components/ContactForm/ContactForm'
import { Icon } from '@/common/components/Icon/Icon'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import { TELEGRAM_HELP_URL } from '@/config/site'
import Link from 'next/link'

export function ContactsPage() {
  return (
    <Section
      className='flex flex-col lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)]'
      alignment='start'
      color='white'
    >
      <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
        <Typography variant='h1'>Контакты</Typography>
        <div className='rte'>
          <h2>Сообщество АА</h2>
          <h3>Анонимный телеграмм чат</h3>
          <p>
            <a
              href={TELEGRAM_HELP_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon icon='telegram' className='rte-social-icon' />
              Анонимный чат
            </a>
          </p>
          <p>
            Этот чат-бот создан для быстрой обратной связи с русскоговорящими
            анонимными алкоголиками по всему миру.
          </p>
          <p>Мы поможем Вам:</p>
          <ul>
            <li>Найти ближайшую к Вам группу на русском языке.</li>
            <li>
              Найти ближайшего от Вас анонимного алкоголика, готового Вам
              помочь.
            </li>
            <li>
              Помочь найти наставника, который поделится опытом выздоровления от
              алкоголизма с помощью программы АА.
            </li>
            <li>
              Ответить на ваши вопросы по социализации после реабилитации.
            </li>
            <li>Связать Вас с АА в Вашей стране проживания.</li>
          </ul>
          <h3>Секретарь</h3>
          <p>Гай С.</p>
          <p>
            тел.: <a href='tel:+972547670219'>+972 54 767 0219</a>
          </p>
          <p>
            <a href='mailto:secretarymaraa@gmail.com'>
              <Icon icon='email' className='rte-social-icon' />
              secretarymaraa@gmail.com
            </a>
          </p>
          <h3>Написать админу (IT-комитет / Администратор):</h3>
          <p>
            В этом разделе вы можете связаться с администратором сайта по
            техническим вопросам, сообщить об ошибке или предложить улучшения.
            Мы внимательно рассматриваем все обращения и стараемся отвечать в
            кратчайшие сроки.
          </p>
          <p>Председатель Комитета по IT: Наташа Л.</p>
          <p>
            <a
              href='https://t.me/Lantsula'
              target='_blank'
              rel='noopener noreferrer'
            >
              @Lantsula
            </a>{' '}
            в Telegram
          </p>
          <p>
            тел.: <a href='tel:+48452686172'>+48 452 686 172</a>
          </p>
          <h3>Связаться с комитетом</h3>
          <p>Комитет по информированию общественности: Анна М.</p>
          <p>
            <a
              href='https://t.me/Hanna_armo'
              target='_blank'
              rel='noopener noreferrer'
            >
              @Hanna_armo
            </a>{' '}
            в Telegram
          </p>
          <p>
            тел.: <a href='tel:+358414962025'>+358 41 496 20 25</a>
          </p>
          <p>
            WhatsApp:{' '}
            <a
              href='https://wa.me/79118377630'
              target='_blank'
              rel='noopener noreferrer'
            >
              +7 911 837 7630
            </a>
          </p>
          <h3>
            Найди наставника (Комитет по работе с лечебными учреждениями):
          </h3>
          <p>Секретарь: Ольга</p>
          <p>
            <a
              href='https://t.me/OlhaP_N'
              target='_blank'
              rel='noopener noreferrer'
            >
              @OlhaP_N
            </a>{' '}
            в Telegram
          </p>
          <p>
            тел.: <a href='tel:+380680833032'>+380 68 083 30 32</a>
          </p>
          <h3>Председатель:</h3>
          <p>Денис Т.</p>
          <p>
            тел.: <a href='tel:+375292152826'>+375 29 215 28 26</a>
          </p>
          <h3>Вопросы и предложения</h3>
          <p>
            <Link href='/12-steps-12-traditions'>12 шагов и традиций</Link>
          </p>
          <p>
            <Link href='/is-aa-for-me'>Подходит ли мне АА?</Link>
          </p>
          <p>
            <Link href='/faq'>Вопросы и ответы</Link>
          </p>
          <p>
            Если Вы не нашли ответ на интересующий Вас вопрос, напишите нам и мы
            Вам ответим в течении 1-3 дней
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  )
}
