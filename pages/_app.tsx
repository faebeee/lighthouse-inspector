import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return <div className={ 'container mx-auto px-2' }>
        <Component { ...pageProps } />
    </div>
}
