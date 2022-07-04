import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import CodeBlock from './CodeBlock'
import TextBlock from './TextBlock'

const Markdown = ({ children }) => {
  const { pathname } = useRouter()
  const searchQuery = useSelector(state => state.searchQuery)

  const renderers = {
    code: props => <CodeBlock {...props} />,
    ...(searchQuery &&
      pathname === '/search' && { p: () => <TextBlock value={children} /> }),
  }

  return <ReactMarkdown children={children} components={renderers} />
}

export default Markdown
