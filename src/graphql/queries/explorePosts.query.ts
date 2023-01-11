import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const ExplorePostsQuery = gql`
  ${PostFragment}
  query ExplorePosts($skip: Int, $limit: Int) {
    explorePosts(skip: $skip, limit: $limit) {
      ...post
    }
  }
`
