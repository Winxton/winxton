import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "./layout"
import SEO from './seo'

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} description={mdx.excerpt}/>
      <div className="content">
        <h1 className="title">{mdx.frontmatter.title}</h1>
        <p className="subtitle is-6">{mdx.frontmatter.date}
          {mdx.frontmatter.tags.map((tag) =>
            <span key={tag} style={{marginLeft: '0.5em'}} className="tag is-light">{tag}</span>)}
        </p>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 140)
      body
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`