import gql from 'graphql-tag'

export const GetNotificationsQuery = gql`
  query GetNotifications {
    getNotifications {
      _id
      isRead
      type
      createdAt
      isSeen
      post {
        _id
        photo
      }
      receiver {
        _id
        avatar
        name
      }
      sender {
        _id
        avatar
        name
      }
    }
  }
`
