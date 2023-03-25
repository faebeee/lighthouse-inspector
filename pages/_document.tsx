import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return <Html>
        <Head title={ "Web Audit Projects" }>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>Web Audit</title>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
    </Html>
}
