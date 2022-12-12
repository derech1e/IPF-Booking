import { MDXProvider } from '@mdx-js/react'
import Header from '../../components/Header'

export default function Layout(props: any) {
    return (
        <div>
            <Header />
            <div className="flex w-screen px-10">
                <div>

                </div>
                <div className="flex w-2">
                    <MDXProvider>
                        {props.children}
                    </MDXProvider>
                </div>
            </div>
        </div>
    )
}