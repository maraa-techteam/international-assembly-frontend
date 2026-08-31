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

/**
 * One numbered section of the notice.
 *
 * The body is wrapped in `.rte`, the same class the CMS rich-text bodies use,
 * so paragraphs, lists and links pick up the site's existing styling without
 * this page carrying a second set of rules that could drift from it.
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
    <article id={id} className='flex scroll-mt-6 flex-col gap-3'>
      <Typography variant='h2'>{heading}</Typography>
      <div className='rte'>{children}</div>
    </article>
  )
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

      <nav aria-label='Содержание' className='rte'>
        <ul>
          <li>
            <a href='#controller'>Кто обрабатывает ваши данные</a>
          </li>
          <li>
            <a href='#data'>Какие данные мы собираем</a>
          </li>
          <li>
            <a href='#cookies'>Файлы cookie, аналитика и трекеры</a>
          </li>
          <li>
            <a href='#purposes'>
              Зачем мы обрабатываем данные и на каком основании
            </a>
          </li>
          <li>
            <a href='#anonymity'>Анонимность и сведения о здоровье</a>
          </li>
          <li>
            <a href='#recipients'>Кому мы передаём данные</a>
          </li>
          <li>
            <a href='#retention'>Сколько мы храним данные</a>
          </li>
          <li>
            <a href='#rights'>Ваши права</a>
          </li>
          <li>
            <a href='#complaint'>Жалоба в надзорный орган</a>
          </li>
          <li>
            <a href='#changes'>Изменения этого уведомления</a>
          </li>
        </ul>
      </nav>

      <NoticeSection id='controller' heading='Кто обрабатывает ваши данные'>
        <p>
          Контролёром персональных данных является {LEGAL_ENTITY_NAME} —{' '}
          {SITE_NAME_FULL}, некоммерческое объединение, зарегистрированное в
          Латвийской Республике ({REGISTRATION.registry}, регистрационный номер{' '}
          {REGISTRATION.number}).
        </p>
        <p>Адрес: {POSTAL_ADDRESS}.</p>
        <p>
          По любым вопросам об обработке ваших данных напишите нам через{' '}
          <Link href='/contacts'>форму обратной связи</Link>.
        </p>
        <p>
          Ответственный за защиту данных (DPO) не назначен: объём обработки не
          достигает порога, при котором статья 37 GDPR это требует.
        </p>
      </NoticeSection>

      <NoticeSection id='data' heading='Какие данные мы собираем'>
        <p>
          Сайт не собирает сведения о посетителях автоматически. Мы получаем
          только то, что вы сами вводите в одну из форм и отправляете нам.
        </p>
        <h3>Форма обратной связи</h3>
        <ul>
          <li>имя или псевдоним — как вы хотите, чтобы к вам обращались;</li>
          <li>адрес электронной почты — чтобы мы могли ответить;</li>
          <li>тема и текст сообщения.</li>
        </ul>
        <h3>Форма заявки на служение</h3>
        <ul>
          <li>имя или псевдоним, адрес электронной почты, текст заявки;</li>
          <li>приложенный вами PDF-файл.</li>
        </ul>
        <h3>Технические журналы</h3>
        <p>
          Наш хостинг-провайдер, как и любой веб-сервер, ведёт технические
          журналы обращений: IP-адрес, тип браузера, дату и время запроса. Они
          нужны для работы и безопасности сайта. Мы не используем их, чтобы
          составлять профиль посетителя, и не связываем с данными из форм.
        </p>
      </NoticeSection>

      <NoticeSection id='cookies' heading='Файлы cookie, аналитика и трекеры'>
        <p>
          Сайт не использует файлы cookie, не устанавливает счётчиков
          посещаемости и не подключает системы веб-аналитики или рекламные
          трекеры. Мы ничего не сохраняем в памяти вашего браузера — ни cookie,
          ни localStorage, ни sessionStorage.
        </p>
        <p>
          Шрифты загружаются с нашего собственного сервера, поэтому при открытии
          страниц обращений к сторонним сервисам не происходит. Ссылки на
          YouTube и Telegram — обычные ссылки, а не встроенные виджеты: пока вы
          по ним не перешли, эти сервисы о вашем визите не узнают.
        </p>
        <p>
          Тест «Подходит ли мне АА?» целиком выполняется в вашем браузере.
          Ответы никуда не отправляются и нигде не сохраняются — закрыв
          страницу, вы их стираете.
        </p>
        <p>
          Поэтому на сайте нет баннера о cookie: спрашивать разрешение попросту
          не на что.
        </p>
      </NoticeSection>

      <NoticeSection
        id='purposes'
        heading='Зачем мы обрабатываем данные и на каком основании'
      >
        <ul>
          <li>
            <span>
              <strong>Чтобы ответить на ваше обращение.</strong> Основание —
              законный интерес Ассамблеи вести переписку с теми, кто к ней
              обратился (ст. 6(1)(f) GDPR).
            </span>
          </li>
          <li>
            <span>
              <strong>Чтобы рассмотреть заявку на служение.</strong> Основание —
              законный интерес Ассамблеи организовывать обслуживание сообщества
              (ст. 6(1)(f) GDPR). В отношении членов сообщества применяется
              также ст. 9(2)(d) GDPR об обработке в рамках деятельности
              некоммерческого объединения.
            </span>
          </li>
          <li>
            <span>
              <strong>
                Если в сообщении окажутся сведения о вашем здоровье
              </strong>{' '}
              — например, о проблеме с алкоголем, — основанием служит ваше явно
              выраженное согласие, которое вы даёте, отмечая соответствующий
              пункт перед отправкой формы (ст. 9(2)(a) GDPR).
            </span>
          </li>
          <li>
            <span>
              <strong>Чтобы обеспечивать работу и безопасность сайта.</strong>{' '}
              Основание — законный интерес (ст. 6(1)(f) GDPR).
            </span>
          </li>
        </ul>
      </NoticeSection>

      <NoticeSection id='anonymity' heading='Анонимность и сведения о здоровье'>
        <p>
          Анонимность — основа сообщества Анонимных Алкоголиков, и мы относимся
          к ней серьёзно. В форме достаточно указать имя или псевдоним:
          настоящее имя мы не спрашиваем и никак не проверяем.
        </p>
        <p>
          <strong>
            Пожалуйста, не описывайте в форме своё состояние здоровья,
            употребление алкоголя и другие личные обстоятельства.
          </strong>{' '}
          Письмо из формы попадает в обычный почтовый ящик секретаря, и это не
          лучший канал для такого разговора.
        </p>
        <p>
          Если вам нужна помощь или просто хочется поговорить, напишите в
          анонимный чат-бот в Telegram:{' '}
          <a href={TELEGRAM_HELP_URL} target='_blank' rel='noopener noreferrer'>
            {TELEGRAM_HELP_URL}
          </a>
          . Это основной канал первого обращения, и он не требует называть себя.
        </p>
        <p>
          Согласие на обработку сведений о здоровье можно отозвать в любой
          момент — просто напишите нам. Отзыв согласия не делает незаконной
          обработку, которая происходила до него (ст. 7(3) GDPR).
        </p>
      </NoticeSection>

      <NoticeSection id='recipients' heading='Кому мы передаём данные'>
        <p>
          Мы не продаём данные, не передаём их рекламодателям и не раскрываем за
          пределами структур обслуживания АА, кроме случаев, когда этого прямо
          требует закон.
        </p>
        <p>
          Отправить письмо, не пользуясь почтовыми сервисами, невозможно,
          поэтому у нас есть два обработчика данных:
        </p>
        <ul>
          <li>
            <span>
              <strong>Resend</strong> (Resend, Inc., США) — доставляет письма,
              отправленные через формы сайта.
            </span>
          </li>
          <li>
            <span>
              <strong>Google Workspace</strong> (Google Ireland Limited, Google
              LLC) — обслуживает почтовый ящик секретаря, куда эти письма
              приходят.
            </span>
          </li>
        </ul>
        <p>
          Оба сервиса действуют как обработчики по договорам, соответствующим
          ст. 28 GDPR, и обрабатывают данные в том числе на серверах в США.
          Передача защищена стандартными договорными условиями Европейской
          комиссии (ст. 46(2)(c) GDPR); обе компании также сертифицированы по
          программе EU–U.S. Data Privacy Framework.
        </p>
        <p>
          Содержимое страниц сайта хранится в нашей системе управления
          контентом. Данные, которые вы отправляете через формы, в неё не
          попадают.
        </p>
      </NoticeSection>

      <NoticeSection id='retention' heading='Сколько мы храним данные'>
        <p>
          Сообщения, отправленные через формы сайта, хранятся в почтовом ящике
          секретаря не дольше 12 месяцев с момента завершения переписки, после
          чего удаляются вместе с вложениями.
        </p>
        <p>
          Срок хранения технических журналов веб-сервера определяется политикой
          хостинг-провайдера и ограничен целями безопасности и диагностики.
        </p>
      </NoticeSection>

      <NoticeSection id='rights' heading='Ваши права'>
        <p>В отношении своих персональных данных вы вправе:</p>
        <ul>
          <li>получить к ним доступ и их копию (ст. 15 GDPR);</li>
          <li>исправить неточные данные (ст. 16);</li>
          <li>потребовать их удаления (ст. 17);</li>
          <li>ограничить обработку (ст. 18);</li>
          <li>получить их в машиночитаемом виде (ст. 20);</li>
          <li>
            возразить против обработки, основанной на законном интересе (ст.
            21);
          </li>
          <li>отозвать ранее данное согласие (ст. 7(3)).</li>
        </ul>
        <p>
          Чтобы воспользоваться любым из этих прав, напишите нам через{' '}
          <Link href='/contacts'>форму обратной связи</Link>. Мы ответим в
          течение одного месяца.
        </p>
        <p>
          Мы не станем требовать от вас документов, удостоверяющих личность: это
          разрушило бы вашу анонимность ради проверки, которая нам не нужна. Как
          правило, достаточно письма с того же адреса, с которого пришло
          исходное сообщение.
        </p>
      </NoticeSection>

      <NoticeSection id='complaint' heading='Жалоба в надзорный орган'>
        <p>
          Если вы считаете, что мы обрабатываем ваши данные неправомерно, вы
          вправе подать жалобу в надзорный орган по месту нашей регистрации:
        </p>
        <p>
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
          >
            {SUPERVISORY_AUTHORITY.url}
          </a>
        </p>
        <p>
          Вы также можете обратиться в надзорный орган страны, где вы постоянно
          живёте или работаете.
        </p>
      </NoticeSection>

      <NoticeSection id='changes' heading='Изменения этого уведомления'>
        <p>
          Если изменится состав собираемых данных или способ их обработки, мы
          обновим этот текст и дату под ним. История правок сохраняется в
          репозитории сайта, поэтому всегда можно увидеть, что уведомление
          говорило раньше.
        </p>
      </NoticeSection>

      <Typography variant='body' className='text-foreground/60 text-sm'>
        Последнее обновление: {formatDate(PRIVACY_NOTICE_UPDATED_AT)}
      </Typography>
    </Section>
  )
}
