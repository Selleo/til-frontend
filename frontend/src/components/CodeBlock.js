import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

function CodeBlock(props) {
  const { children, className } = props
  const match = /language-(\w+)/.exec(className || '')

  return match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={darcula}
      language={match[1]}
      PreTag="div"
      className={className}
    />
  ) : (
    <code className={className}>{children}</code>
  )
}

export default CodeBlock
