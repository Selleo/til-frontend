import Link from 'next/link'

const FourOhFour = () => {
  return (
    <div className="main-content">
      <h1> 404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back to main Page</a>
      </Link>
    </div>
  )
}

export default FourOhFour
