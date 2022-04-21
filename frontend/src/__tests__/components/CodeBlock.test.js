import React from 'react'
import { render, screen } from '@testing-library/react'
import CodeBlock from '../../components/CodeBlock'

describe('CodeBlock', () => {
  it('should render SyntaxHighlighter', () => {
    const { container } = render(
      <CodeBlock className={'language-ts'} children={'console.log("test")'} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render Code component', () => {
    render(<CodeBlock children={'console.log("test")'} />)
    expect(screen.getByText('console.log("test")')).toBeInTheDocument()
  })
})
