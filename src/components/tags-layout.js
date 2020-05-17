import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "./layout";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          return (
            <div key={node.id} className="column" style={{paddingBottom: '1rem'}}>
              <li>
                <Link to={node.fields.slug}>
                  <h2>{node.frontmatter.title}</h2>
                </Link>
                <span style={{paddingRight: '.5rem'}} className="subtitle is-6">{node.frontmatter.date}</span>
                {node.frontmatter.tags.map((tag) => <span key={tag} className="tag is-light">{tag}</span>)}
                <p>{node.excerpt}</p>
              </li>
            </div>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`
