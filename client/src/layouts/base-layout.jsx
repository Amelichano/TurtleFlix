import NavMenu from '../components/nav-menu'
import Footer from '../components/footer'

function BaseLayout({ children }) {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-screen-xl flex-col p-4">
      <NavMenu />
      <main className="mb-20 flex-1 py-6 lg:mb-28">{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
