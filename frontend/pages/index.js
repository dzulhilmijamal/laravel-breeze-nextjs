import Head from 'next/head'
import PostData from './api'

export default function Home() {
  return (
    <>
      <Head>
        <title>Playing Card</title>
      </Head>
      <main>
        <div class="container mx-auto px-4">
          <PostData />
        </div>
      </main>
    </>
  )
}
