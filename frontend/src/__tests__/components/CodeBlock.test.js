import React from 'react'
import { render, screen } from '@testing-library/react'
import CodeBlock from '../../components/CodeBlock'

describe('CodeBlock', () => {
  const codeToBeDisplayed = 'console.log("test")'

  it('should render SyntaxHighlighter', () => {
    const { container } = render(
      <CodeBlock className={'language-ts'} children={codeToBeDisplayed} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render Code component', () => {
    render(<CodeBlock children={codeToBeDisplayed} />)
    expect(screen.getByText(codeToBeDisplayed)).toBeInTheDocument()
  })
})
