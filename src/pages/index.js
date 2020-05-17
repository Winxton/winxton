import React from "react"
import { Link, graphql } from "gatsby"
import Layout from '../components/layout'
import { chunkArray } from '../utils/utils'
import SEO from '../components/seo'


function renderItem({ node: post }) {
  return (
    <div key={post.id} className="column" style={{paddingBottom: '1rem'}}>
      <li>
        <Link to={post.fields.slug}>
          <h2>{post.frontmatter.title}</h2>
        </Link>
        <span style={{paddingRight: '.5rem'}} className="subtitle is-6">{post.frontmatter.date}</span>
        {post.frontmatter.tags.map((tag) => <span key={tag} className="tag is-light">{tag}</span>)}
        <p>{post.excerpt}</p>
      </li>
    </div>
  )
}

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  
  const edgesChunked = chunkArray(posts, 1)

  return (
    <Layout>
      <SEO title="Winxton" titleTemplate="Winxton"/>
      <ul>
        <h1 className="title">Posts</h1>
        {edgesChunked.map((nodes, idx) => {
          return (
            <div key={idx} className="columns">
              {nodes.map((node) => renderItem(node))}
            </div>
          );
        })}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogIndex {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          excerpt(pruneLength: 280)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default BlogIndex
