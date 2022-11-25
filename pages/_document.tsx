import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return <Html>
        <Head title={ 'Lighthouse Projects' }>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <meta name="viewport" content="initial-scale=1, width=device-width" />

        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
    </Html>
}
