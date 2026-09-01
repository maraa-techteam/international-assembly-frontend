import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import { formatDate } from '@/common/utils/dateFormatter'
import {
  LEGAL_ENTITY_NAME,
  POSTAL_ADDRESS,
  PRIVACY_NOTICE_UPDATED_AT,
  REGISTRATION,
  SITE_NAME_FULL,
  SUPERVISORY_AUTHORITY,
  TELEGRAM_HELP_URL,
} from '@/config/site'
import Link from 'next/link'

/** Inline links in running prose. */
const PROSE_LINK = 'text-primary hover:text-secondary underline'

/** Body copy inside a list item, matching Typography's `body` variant. */
const LIST_ITEM = 'text-contrast text-base font-normal wrap-break-word'

/**
 * One section of the notice: a heading followed by its body copy.
 *
 * Children are direct flex children, so every paragraph and list in a section
 * is spaced by the same gap.
 *
 * The scroll margin has to clear the fixed header, or following a link from the
 * contents list leaves the heading hidden behind it.
 */
function NoticeSection({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <article id={id} className='flex scroll-mt-24 flex-col gap-3'>
      <Typography variant='h2'>{heading}</Typography>
      {children}
    </article>
  )
}

/** A sub-heading within a section. */
function NoticeSubheading({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant='h3' className='mt-2'>
      {children}
    </Typography>
  )
}

/**
 * A bulleted list.
 *
 * Plain disc markers on purpose: this page is authored here, not in the CMS,
 * and the decorative checkmark bullets `.rte` applies read as endorsement
 * rather than enumeration when the items are statutory references.
 */
function NoticeList({ children }: { children: React.ReactNode }) {
  return <ul className='flex list-disc flex-col gap-2 pl-5'>{children}</ul>
}

/**
 * The privacy notice.
 *
 * The text is written out here rather than read from the CMS, and deliberately
 * so: git records what the notice said on any given day, which is the thing
 * actually needed if someone later asks what they agreed to when they submitted
 * the form. A CMS field edited in place, with the previous wording gone, cannot
 * answer that. The cost is that changing it needs a deploy — acceptable for a
 * document that should change rarely and on purpose.
 *
 * The contents list below is written out by hand alongside the sections. Adding
 * a section means adding a link to it as well.
 */
export function PrivacyPolicyPage() {
  return (
    <Section color='white' className='max-w-300 items-start'>
      <Typography variant='h1'>Уведомление о конфиденциальности</Typography>

      <Typography variant='body'>
        Здесь описано, какие данные Международная Ассамблея получает через этот
        сайт, зачем они нужны, кому передаются и как их удалить. Коротко: сайт
        не следит за посетителями, а всё, что мы знаем, вы сообщаете нам сами,
        заполнив форму.
      </Typography>

      <nav
        aria-label='Содержание'
        className='border-primary flex w-full flex-col gap-3 rounded-xl border-1 p-4'
      >
        <Typography variant='h3'>Содержание</Typography>
        <ul className='flex flex-col gap-2'>
          <li className={LIST_ITEM}>
            <a href='#controller' className={PROSE_LINK}>
              Кто обрабатывает ваши данные
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#data' className={PROSE_LINK}>
              Какие данные мы собираем
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#cookies' className={PROSE_LINK}>
              Файлы cookie, аналитика и трекеры
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#purposes' className={PROSE_LINK}>
              Зачем мы обрабатываем данные и на каком основании
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#anonymity' className={PROSE_LINK}>
              Анонимность и сведения о здоровье
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#recipients' className={PROSE_LINK}>
              Кому мы передаём данные
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#retention' className={PROSE_LINK}>
              Сколько мы храним данные
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#rights' className={PROSE_LINK}>
              Ваши права
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#complaint' className={PROSE_LINK}>
              Жалоба в надзорный орган
            </a>
          </li>
          <li className={LIST_ITEM}>
            <a href='#changes' className={PROSE_LINK}>
              Изменения этого уведомления
            </a>
          </li>
        </ul>
      </nav>

      <NoticeSection id='controller' heading='Кто обрабатывает ваши данные'>
        <Typography variant='body'>
          Контролёром персональных данных является {LEGAL_ENTITY_NAME} —{' '}
          {SITE_NAME_FULL}, некоммерческое объединение, зарегистрированное в
          Латвийской Республике ({REGISTRATION.registry}, регистрационный номер{' '}
          {REGISTRATION.number}).
        </Typography>
        <Typography variant='body'>Адрес: {POSTAL_ADDRESS}.</Typography>
        <Typography variant='body'>
          По любым вопросам об обработке ваших данных напишите нам через{' '}
          <Link href='/contacts' className={PROSE_LINK}>
            форму обратной связи
          </Link>
          .
        </Typography>
        <Typography variant='body'>
          Ответственный за защиту данных (DPO) не назначен: объём обработки не
          достигает порога, при котором статья 37 GDPR это требует.
        </Typography>
      </NoticeSection>

      <NoticeSection id='data' heading='Какие данные мы собираем'>
        <Typography variant='body'>
          Сайт не собирает сведения о посетителях автоматически. Мы получаем
          только то, что вы сами вводите в одну из форм и отправляете нам.
        </Typography>

        <NoticeSubheading>Форма обратной связи</NoticeSubheading>
        <NoticeList>
          <li className={LIST_ITEM}>
            имя или псевдоним — как вы хотите, чтобы к вам обращались;
          </li>
          <li className={LIST_ITEM}>
            адрес электронной почты — чтобы мы могли ответить;
          </li>
          <li className={LIST_ITEM}>тема и текст сообщения.</li>
        </NoticeList>

        <NoticeSubheading>Форма заявки на служение</NoticeSubheading>
        <NoticeList>
          <li className={LIST_ITEM}>
            имя или псевдоним, адрес электронной почты, текст заявки;
          </li>
          <li className={LIST_ITEM}>приложенный вами PDF-файл.</li>
        </NoticeList>

        <NoticeSubheading>Технические журналы</NoticeSubheading>
        <Typography variant='body'>
          Наш хостинг-провайдер, как и любой веб-сервер, ведёт технические
          журналы обращений: IP-адрес, тип браузера, дату и время запроса. Они
          нужны для работы и безопасности сайта. Мы не используем их, чтобы
          составлять профиль посетителя, и не связываем с данными из форм.
        </Typography>
      </NoticeSection>

      <NoticeSection id='cookies' heading='Файлы cookie, аналитика и трекеры'>
        <Typography variant='body'>
          Сайт не использует файлы cookie, не устанавливает счётчиков
          посещаемости и не подключает системы веб-аналитики или рекламные
          трекеры. Мы ничего не сохраняем в памяти вашего браузера — ни cookie,
          ни localStorage, ни sessionStorage.
        </Typography>
        <Typography variant='body'>
          Шрифты загружаются с нашего собственного сервера, поэтому при открытии
          страниц обращений к сторонним сервисам не происходит. Ссылки на
          YouTube и Telegram — обычные ссылки, а не встроенные виджеты: пока вы
          по ним не перешли, эти сервисы о вашем визите не узнают.
        </Typography>
        <Typography variant='body'>
          Тест «Подходит ли мне АА?» целиком выполняется в вашем браузере.
          Ответы никуда не отправляются и нигде не сохраняются — закрыв
          страницу, вы их стираете.
        </Typography>
        <Typography variant='body'>
          Поэтому на сайте нет баннера о cookie: спрашивать разрешение попросту
          не на что.
        </Typography>
      </NoticeSection>

      <NoticeSection
        id='purposes'
        heading='Зачем мы обрабатываем данные и на каком основании'
      >
        <NoticeList>
          <li className={LIST_ITEM}>
            <strong>Чтобы ответить на ваше обращение.</strong> Основание —
            законный интерес Ассамблеи вести переписку с теми, кто к ней
            обратился (ст. 6(1)(f) GDPR).
          </li>
          <li className={LIST_ITEM}>
            <strong>Чтобы рассмотреть заявку на служение.</strong> Основание —
            законный интерес Ассамблеи организовывать обслуживание сообщества
            (ст. 6(1)(f) GDPR). В отношении членов сообщества применяется также
            ст. 9(2)(d) GDPR об обработке в рамках деятельности некоммерческого
            объединения.
          </li>
          <li className={LIST_ITEM}>
            <strong>Если в сообщении окажутся сведения о вашем здоровье</strong>{' '}
            — например, о проблеме с алкоголем, — основанием служит ваше явно
            выраженное согласие, которое вы даёте, отмечая соответствующий пункт
            перед отправкой формы (ст. 9(2)(a) GDPR).
          </li>
          <li className={LIST_ITEM}>
            <strong>Чтобы обеспечивать работу и безопасность сайта.</strong>{' '}
            Основание — законный интерес (ст. 6(1)(f) GDPR).
          </li>
        </NoticeList>
      </NoticeSection>

      <NoticeSection id='anonymity' heading='Анонимность и сведения о здоровье'>
        <Typography variant='body'>
          Анонимность — основа сообщества Анонимных Алкоголиков, и мы относимся
          к ней серьёзно. В форме достаточно указать имя или псевдоним:
          настоящее имя мы не спрашиваем и никак не проверяем.
        </Typography>
        <Typography variant='body'>
          <strong>
            Пожалуйста, не описывайте в форме своё состояние здоровья,
            употребление алкоголя и другие личные обстоятельства.
          </strong>{' '}
          Письмо из формы попадает в обычный почтовый ящик секретаря, и это не
          лучший канал для такого разговора.
        </Typography>
        <Typography variant='body'>
          Если вам нужна помощь или просто хочется поговорить, напишите в
          анонимный чат-бот в Telegram:{' '}
          <a
            href={TELEGRAM_HELP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={PROSE_LINK}
          >
            {TELEGRAM_HELP_URL}
          </a>
          . Это основной канал первого обращения, и он не требует называть себя.
        </Typography>
        <Typography variant='body'>
          Согласие на обработку сведений о здоровье можно отозвать в любой
          момент — просто напишите нам. Отзыв согласия не делает незаконной
          обработку, которая происходила до него (ст. 7(3) GDPR).
        </Typography>
      </NoticeSection>

      <NoticeSection id='recipients' heading='Кому мы передаём данные'>
        <Typography variant='body'>
          Мы не продаём данные, не передаём их рекламодателям и не раскрываем за
          пределами структур обслуживания АА, кроме случаев, когда этого прямо
          требует закон.
        </Typography>
        <Typography variant='body'>
          Отправить письмо, не пользуясь почтовыми сервисами, невозможно,
          поэтому у нас есть два обработчика данных:
        </Typography>
        <NoticeList>
          <li className={LIST_ITEM}>
            <strong>Resend</strong> (Resend, Inc., США) — доставляет письма,
            отправленные через формы сайта.
          </li>
          <li className={LIST_ITEM}>
            <strong>Google Workspace</strong> (Google Ireland Limited, Google
            LLC) — обслуживает почтовый ящик секретаря, куда эти письма
            приходят.
          </li>
        </NoticeList>
        <Typography variant='body'>
          Оба сервиса действуют как обработчики по договорам, соответствующим
          ст. 28 GDPR, и обрабатывают данные в том числе на серверах в США.
          Передача защищена стандартными договорными условиями Европейской
          комиссии (ст. 46(2)(c) GDPR); обе компании также сертифицированы по
          программе EU–U.S. Data Privacy Framework.
        </Typography>
        <Typography variant='body'>
          Содержимое страниц сайта хранится в нашей системе управления
          контентом. Данные, которые вы отправляете через формы, в неё не
          попадают.
        </Typography>
      </NoticeSection>

      <NoticeSection id='retention' heading='Сколько мы храним данные'>
        <Typography variant='body'>
          Сообщения, отправленные через формы сайта, хранятся в почтовом ящике
          секретаря не дольше 12 месяцев с момента завершения переписки, после
          чего удаляются вместе с вложениями.
        </Typography>
        <Typography variant='body'>
          Срок хранения технических журналов веб-сервера определяется политикой
          хостинг-провайдера и ограничен целями безопасности и диагностики.
        </Typography>
      </NoticeSection>

      <NoticeSection id='rights' heading='Ваши права'>
        <Typography variant='body'>
          В отношении своих персональных данных вы вправе:
        </Typography>
        <NoticeList>
          <li className={LIST_ITEM}>
            получить к ним доступ и их копию (ст. 15 GDPR);
          </li>
          <li className={LIST_ITEM}>исправить неточные данные (ст. 16);</li>
          <li className={LIST_ITEM}>потребовать их удаления (ст. 17);</li>
          <li className={LIST_ITEM}>ограничить обработку (ст. 18);</li>
          <li className={LIST_ITEM}>
            получить их в машиночитаемом виде (ст. 20);
          </li>
          <li className={LIST_ITEM}>
            возразить против обработки, основанной на законном интересе (ст.
            21);
          </li>
          <li className={LIST_ITEM}>
            отозвать ранее данное согласие (ст. 7(3)).
          </li>
        </NoticeList>
        <Typography variant='body'>
          Чтобы воспользоваться любым из этих прав, напишите нам через{' '}
          <Link href='/contacts' className={PROSE_LINK}>
            форму обратной связи
          </Link>
          . Мы ответим в течение одного месяца.
        </Typography>
        <Typography variant='body'>
          Мы не станем требовать от вас документов, удостоверяющих личность: это
          разрушило бы вашу анонимность ради проверки, которая нам не нужна. Как
          правило, достаточно письма с того же адреса, с которого пришло
          исходное сообщение.
        </Typography>
      </NoticeSection>

      <NoticeSection id='complaint' heading='Жалоба в надзорный орган'>
        <Typography variant='body'>
          Если вы считаете, что мы обрабатываем ваши данные неправомерно, вы
          вправе подать жалобу в надзорный орган по месту нашей регистрации:
        </Typography>
        <Typography variant='body'>
          {SUPERVISORY_AUTHORITY.name}
          <br />
          {SUPERVISORY_AUTHORITY.address}
          <br />
          {SUPERVISORY_AUTHORITY.email}
          <br />
          <a
            href={SUPERVISORY_AUTHORITY.url}
            target='_blank'
            rel='noopener noreferrer'
            className={PROSE_LINK}
          >
            {SUPERVISORY_AUTHORITY.url}
          </a>
        </Typography>
        <Typography variant='body'>
          Вы также можете обратиться в надзорный орган страны, где вы постоянно
          живёте или работаете.
        </Typography>
      </NoticeSection>

      <NoticeSection id='changes' heading='Изменения этого уведомления'>
        <Typography variant='body'>
          Если изменится состав собираемых данных или способ их обработки, мы
          обновим этот текст и дату под ним. История правок сохраняется в
          репозитории сайта, поэтому всегда можно увидеть, что уведомление
          говорило раньше.
        </Typography>
      </NoticeSection>

      <Typography variant='body' className='text-foreground/60 text-sm'>
        Последнее обновление: {formatDate(PRIVACY_NOTICE_UPDATED_AT)}
      </Typography>
    </Section>
  )
}
