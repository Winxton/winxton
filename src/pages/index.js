import React from "react"
import { Link, graphql } from "gatsby"
import Layout from '../components/layout';

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
export function chunkArray(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}

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
      <h1 className="title">Posts</h1>
      <ul>
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
