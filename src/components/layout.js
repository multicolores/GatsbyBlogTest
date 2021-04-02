import * as React from "react"
import { Link } from "gatsby"
import "./styles.scss"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header container">{header}</header>
      <main className="container">{children}</main>
      <footer className="container">
        Site créer par
        <a href="https://floriantellier.netlify.app/"> Florian TELLIER</a>
      </footer>
    </div>
  )
}

export default Layout
