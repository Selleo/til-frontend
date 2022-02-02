import React from 'react'

import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import CodeBlock from './CodeBlock'
import TextBlock from './TextBlock'

const Markdown = ({ source }) => {
  const searchQuery = useSelector(state => state.searchQuery)
  const { pathname } = useLocation()

  const renderers = {
    code: CodeBlock,
  }

  if (searchQuery && pathname === '/search') {
    renderers.text = TextBlock
  }

  return <ReactMarkdown source={source} renderers={renderers} />
}

export default Markdown
