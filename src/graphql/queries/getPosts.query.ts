import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const GetPostsQuery = gql`
  ${PostFragment}
  query GetPosts {
    getPosts {
      ...post
    }
  }
`
