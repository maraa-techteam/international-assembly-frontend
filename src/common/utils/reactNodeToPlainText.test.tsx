import { reactNodeToPlainText } from './reactNodeToPlainText'
import { htmlToPlainText } from './toMetaDescription'

function Decorated({ children }: { children: React.ReactNode }) {
  return <strong>{children}</strong>
}

describe('reactNodeToPlainText', () => {
  it('returns plain text unchanged', () => {
    expect(reactNodeToPlainText('Ответ')).toBe('Ответ')
  })

  it('reads the text of nested elements', () => {
    expect(
      reactNodeToPlainText(
        <p>
          Вот <a href='/faq'>ссылка</a> на страницу
        </p>,
      ),
    ).toBe('Вот ссылка на страницу')
  })

  it('keeps words apart across paragraphs and line breaks', () => {
    expect(
      reactNodeToPlainText(
        <>
          <p>Первый</p>
          <p>
            Второй
            <br />
            Третий
          </p>
        </>,
      ),
    ).toBe('Первый Второй Третий')
  })

  it('reads list items', () => {
    expect(
      reactNodeToPlainText(
        <ul>
          <li>Один</li>
          <li>Два</li>
        </ul>,
      ),
    ).toBe('Один Два')
  })

  it('reads through components that pass their children on', () => {
    expect(reactNodeToPlainText(<Decorated>Важно</Decorated>)).toBe('Важно')
  })

  it('ignores elements with no text and empty values', () => {
    expect(
      reactNodeToPlainText(
        <p>
          <svg />
          Текст{null}
          {false}
        </p>,
      ),
    ).toBe('Текст')
    expect(reactNodeToPlainText(null)).toBe('')
  })

  it('collapses non-breaking spaces the way htmlToPlainText does', () => {
    expect(reactNodeToPlainText(<p>Один&nbsp;два</p>)).toBe('Один два')
  })

  it('matches htmlToPlainText, so the FAQ JSON-LD keeps its wording', () => {
    expect(
      reactNodeToPlainText(
        <>
          <p>
            Определить это сможете только вы сами.{' '}
            <strong>В АА за вас этого никто делать не будет</strong>.
          </p>
          <ul>
            <li>воздерживается от «первой рюмки»</li>
          </ul>
        </>,
      ),
    ).toBe(
      htmlToPlainText(
        '<p>Определить это сможете только вы сами. <strong>В АА за вас этого никто делать не будет</strong>.</p><ul><li>воздерживается от &laquo;первой рюмки&raquo;</li></ul>',
      ),
    )
  })
})
