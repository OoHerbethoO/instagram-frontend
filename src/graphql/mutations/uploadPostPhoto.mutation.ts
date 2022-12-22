import gql from 'graphql-tag'

export const UploadPostPhotoMutation = gql`
  mutation UploadPostPhoto($photo: Upload!) {
    uploadPostPhoto(photo: $photo)
  }
`
