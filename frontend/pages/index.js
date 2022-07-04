import Head from 'next/head'

import AllPosts from '../src/components/AllPosts'

import { useSelector } from 'react-redux'

const App = () => {
  const pageTitle = useSelector(state => state.pageTitle)
  const pageDescription = useSelector(state => state.pageDescription)
  const title = pageTitle ? `Selleo | ${pageTitle}` : 'Selleo | Today I Learned'
  const description = pageDescription || 'Today I Learned | Selleo Portal'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="../public/assets/images/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Head>

      <AllPosts />
    </>
  )
}

export default App
