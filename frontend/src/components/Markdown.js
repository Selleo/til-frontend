import React from 'react'

import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import CodeBlock from './CodeBlock'
import TextBlock from './TextBlock'

const Markdown = ({ children }) => {
  const searchQuery = useSelector(state => state.searchQuery)
  const { pathname } = useLocation()

  const renderers = {
    code: props => <CodeBlock {...props} />,
    ...(searchQuery &&
      pathname === '/search' && { p: () => <TextBlock value={children} /> }),
  }

  return <ReactMarkdown children={children} components={renderers} />
}

export default Markdown
