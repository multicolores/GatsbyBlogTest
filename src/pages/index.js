import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import "../components/styles.scss"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <div key={post.fields.slug}>
              <article>
                <div className="blogpost_text">
                  <Link to={post.fields.slug}
                  >
                    <h3>{post.frontmatter.title}</h3>

                  </Link>
                  <span>
                    {post.frontmatter.date}
                  </span>

                  <p>
                    {post.excerpt}
                  </p>
                  <span>Image : {post.frontmatter.featuredimage}</span>

                  {post.frontmatter.featuredimage ? (
                    <div className="post-image">

                      <img src={post.frontmatter.featuredimage} alt="" />
                      <Image alt="image d'accueil" filename={post.frontmatter.featuredimage} />

                    </div>
                  ) : null}
                  {/* <Link className="button" to={post.fields.slug}>
                    Keep Reading
                  </Link> */}

                </div>
              </article>

            </div>


            // <li key={post.fields.slug}>
            //   <article
            //     className="post-list-item"
            //     itemScope
            //     itemType="http://schema.org/Article"
            //   >

            //     <header>
            //       <h2>
            //         <Link to={post.fields.slug} itemProp="url">
            //           <span itemProp="headline">{title}</span>
            //         </Link>
            //       </h2>
            //       <small>{post.frontmatter.date}</small>
            //     </header>
            //     <section>
            //       <p
            //         dangerouslySetInnerHTML={{
            //           __html: post.frontmatter.description || post.excerpt,
            //         }}
            //         itemProp="description"
            //       />
            //     </section>
            //   </article>
            // </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`