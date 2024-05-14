import NavMenu from '../components/nav-menu'
import Footer from '../components/footer'

function BaseLayout({ children }) {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-screen-xl flex-col p-4">
      <NavMenu />
      <main className="mb-16 flex flex-1 items-center py-6">{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
