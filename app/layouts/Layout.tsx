import { ReactNode } from "react"
import { Head, useSession } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { useCurrentUser } from "app/hooks/useCurrentUser"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
 
  return (
    <>
      <Head>
        <title>{title || "freshcart"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default Layout
