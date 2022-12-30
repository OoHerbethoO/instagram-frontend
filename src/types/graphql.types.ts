import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type IAuthData = {
  token: Scalars['String'];
};

export type IComment = {
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  likes: Array<Maybe<Scalars['ID']>>;
  post: IPost;
  user: IUser;
};

export type IMutation = {
  bookmarkPost: Scalars['Boolean'];
  createComment: IComment;
  createPost: IPost;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  followOrUnfollowUser?: Maybe<Scalars['Boolean']>;
  likeComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  login?: Maybe<IAuthData>;
  register?: Maybe<IRegisterResponse>;
  searchUsersByName?: Maybe<Array<Maybe<IUser>>>;
  updateProfile?: Maybe<Scalars['Boolean']>;
  uploadPhoto: Scalars['String'];
};


export type IMutationBookmarkPostArgs = {
  postId: Scalars['ID'];
};


export type IMutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type IMutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  photo?: InputMaybe<Scalars['String']>;
};


export type IMutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type IMutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type IMutationFollowOrUnfollowUserArgs = {
  userId: Scalars['ID'];
};


export type IMutationLikeCommentArgs = {
  commentId: Scalars['ID'];
};


export type IMutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type IMutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type IMutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type IMutationSearchUsersByNameArgs = {
  name: Scalars['String'];
};


export type IMutationUpdateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profession?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};


export type IMutationUploadPhotoArgs = {
  file: Scalars['Upload'];
};

export type IPost = {
  _id: Scalars['ID'];
  comments?: Maybe<Array<Maybe<Scalars['ID']>>>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  likes?: Maybe<Array<Maybe<Scalars['ID']>>>;
  photo?: Maybe<Scalars['String']>;
  user?: Maybe<IUser>;
};

export type IQuery = {
  getAllPosts: Array<Maybe<IPost>>;
  getBookmarkedPosts: Array<Maybe<IPost>>;
  getComments: Array<IComment>;
  getPostById: IPost;
  getPostsByUser: Array<Maybe<IPost>>;
  getUserById?: Maybe<IUser>;
  me?: Maybe<IUser>;
};


export type IQueryGetCommentsArgs = {
  comments: Array<Scalars['ID']>;
};


export type IQueryGetPostByIdArgs = {
  postId: Scalars['ID'];
};


export type IQueryGetPostsByUserArgs = {
  userId: Scalars['ID'];
};


export type IQueryGetUserByIdArgs = {
  id: Scalars['ID'];
};

export type IRegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type IRegisterResponse = {
  message: Scalars['String'];
};

export type IUser = {
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<Array<Maybe<Scalars['ID']>>>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  isVerified?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  profession?: Maybe<Scalars['String']>;
  totalMessages?: Maybe<Scalars['Int']>;
  totalNotifications?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

export type ICommentFragment = { content: string, _id: string, createdAt: any, likes: Array<string | null>, post: { _id: string }, user: { _id: string, avatar?: string | null, name: string } };

export type IPostFragment = { _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null };

export type IUserFragment = { _id: string, name: string, avatar?: string | null, location?: string | null, website?: string | null, cover?: string | null, bio?: string | null, profession?: string | null, dateOfBirth?: any | null, createdAt?: any | null, followers?: Array<string | null> | null, following?: Array<string | null> | null, posts?: Array<string | null> | null, bookmarks?: Array<string | null> | null, totalNotifications?: number | null, totalMessages?: number | null, isVerified?: boolean | null };

export type IBookmarkPostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type IBookmarkPostMutationResult = { bookmarkPost: boolean };

export type ICreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['ID'];
}>;


export type ICreateCommentMutationResult = { createComment: { content: string, _id: string, createdAt: any, likes: Array<string | null>, post: { _id: string }, user: { _id: string, avatar?: string | null, name: string } } };

export type ICreatePostMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
}>;


export type ICreatePostMutationResult = { createPost: { _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } };

export type IDeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type IDeleteCommentMutationResult = { deleteComment: boolean };

export type IDeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type IDeletePostMutationResult = { deletePost: boolean };

export type ILikeCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type ILikeCommentMutationResult = { likeComment: boolean };

export type ILikePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type ILikePostMutationResult = { likePost: boolean };

export type ILoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ILoginMutationResult = { login?: { token: string } | null };

export type IRegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type IRegisterMutationResult = { register?: { message: string } | null };

export type IUpdateProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  profession?: InputMaybe<Scalars['String']>;
}>;


export type IUpdateProfileMutationResult = { updateProfile?: boolean | null };

export type IUploadPhotoMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type IUploadPhotoMutationResult = { uploadPhoto: string };

export type IGetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetAllPostsQueryResult = { getAllPosts: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IGetBookmarkedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetBookmarkedPostsQueryResult = { getBookmarkedPosts: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IGetCommentsQueryVariables = Exact<{
  comments: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type IGetCommentsQueryResult = { getComments: Array<{ content: string, _id: string, createdAt: any, likes: Array<string | null>, post: { _id: string }, user: { _id: string, avatar?: string | null, name: string } }> };

export type IGetUserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IGetUserByIdQueryResult = { getUserById?: { _id: string, name: string, avatar?: string | null, location?: string | null, website?: string | null, cover?: string | null, bio?: string | null, profession?: string | null, dateOfBirth?: any | null, createdAt?: any | null, followers?: Array<string | null> | null, following?: Array<string | null> | null, posts?: Array<string | null> | null, bookmarks?: Array<string | null> | null, totalNotifications?: number | null, totalMessages?: number | null, isVerified?: boolean | null } | null };

export type IGetPostsByUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type IGetPostsByUserQueryResult = { getPostsByUser: Array<{ _id: string, content?: string | null, photo?: string | null, createdAt?: any | null, likes?: Array<string | null> | null, comments?: Array<string | null> | null, isPublic?: boolean | null, user?: { name: string, _id: string, avatar?: string | null } | null } | null> };

export type IMeQueryVariables = Exact<{ [key: string]: never; }>;


export type IMeQueryResult = { me?: { _id: string, name: string, avatar?: string | null, location?: string | null, website?: string | null, cover?: string | null, bio?: string | null, profession?: string | null, dateOfBirth?: any | null, createdAt?: any | null, followers?: Array<string | null> | null, following?: Array<string | null> | null, posts?: Array<string | null> | null, bookmarks?: Array<string | null> | null, totalNotifications?: number | null, totalMessages?: number | null, isVerified?: boolean | null } | null };

export const CommentFragmentDoc = gql`
    fragment comment on Comment {
  content
  _id
  createdAt
  likes
  post {
    _id
  }
  user {
    _id
    avatar
    name
  }
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  _id
  content
  photo
  user {
    name
    _id
    avatar
  }
  createdAt
  likes
  comments
  isPublic
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  _id
  name
  avatar
  location
  website
  cover
  bio
  profession
  dateOfBirth
  createdAt
  followers
  following
  posts
  bookmarks
  totalNotifications
  totalMessages
  isVerified
}
    `;
export const BookmarkPostDocument = gql`
    mutation BookmarkPost($postId: ID!) {
  bookmarkPost(postId: $postId)
}
    `;

/**
 * __useBookmarkPostMutation__
 *
 * To run a mutation, you first call `useBookmarkPostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkPostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBookmarkPostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useBookmarkPostMutation(options: VueApolloComposable.UseMutationOptions<IBookmarkPostMutationResult, IBookmarkPostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IBookmarkPostMutationResult, IBookmarkPostMutationVariables>>) {
  return VueApolloComposable.useMutation<IBookmarkPostMutationResult, IBookmarkPostMutationVariables>(BookmarkPostDocument, options);
}
export type BookmarkPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IBookmarkPostMutationResult, IBookmarkPostMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($content: String!, $postId: ID!) {
  createComment(content: $content, postId: $postId) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCommentMutation({
 *   variables: {
 *     content: // value for 'content'
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(options: VueApolloComposable.UseMutationOptions<ICreateCommentMutationResult, ICreateCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ICreateCommentMutationResult, ICreateCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<ICreateCommentMutationResult, ICreateCommentMutationVariables>(CreateCommentDocument, options);
}
export type CreateCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ICreateCommentMutationResult, ICreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($content: String, $photo: String, $isPublic: Boolean) {
  createPost(content: $content, photo: $photo, isPublic: $isPublic) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreatePostMutation({
 *   variables: {
 *     content: // value for 'content'
 *     photo: // value for 'photo'
 *     isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useCreatePostMutation(options: VueApolloComposable.UseMutationOptions<ICreatePostMutationResult, ICreatePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ICreatePostMutationResult, ICreatePostMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ICreatePostMutationResult, ICreatePostMutationVariables>(CreatePostDocument, options);
}
export type CreatePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ICreatePostMutationResult, ICreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId)
}
    `;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(options: VueApolloComposable.UseMutationOptions<IDeleteCommentMutationResult, IDeleteCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IDeleteCommentMutationResult, IDeleteCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<IDeleteCommentMutationResult, IDeleteCommentMutationVariables>(DeleteCommentDocument, options);
}
export type DeleteCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IDeleteCommentMutationResult, IDeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
    `;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(options: VueApolloComposable.UseMutationOptions<IDeletePostMutationResult, IDeletePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IDeletePostMutationResult, IDeletePostMutationVariables>>) {
  return VueApolloComposable.useMutation<IDeletePostMutationResult, IDeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IDeletePostMutationResult, IDeletePostMutationVariables>;
export const LikeCommentDocument = gql`
    mutation LikeComment($commentId: ID!) {
  likeComment(commentId: $commentId)
}
    `;

/**
 * __useLikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikeCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *   },
 * });
 */
export function useLikeCommentMutation(options: VueApolloComposable.UseMutationOptions<ILikeCommentMutationResult, ILikeCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ILikeCommentMutationResult, ILikeCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<ILikeCommentMutationResult, ILikeCommentMutationVariables>(LikeCommentDocument, options);
}
export type LikeCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ILikeCommentMutationResult, ILikeCommentMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: ID!) {
  likePost(postId: $postId)
}
    `;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikePostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(options: VueApolloComposable.UseMutationOptions<ILikePostMutationResult, ILikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ILikePostMutationResult, ILikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<ILikePostMutationResult, ILikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ILikePostMutationResult, ILikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<ILoginMutationResult, ILoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ILoginMutationResult, ILoginMutationVariables>>) {
  return VueApolloComposable.useMutation<ILoginMutationResult, ILoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ILoginMutationResult, ILoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    message
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     name: // value for 'name'
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<IRegisterMutationResult, IRegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IRegisterMutationResult, IRegisterMutationVariables>>) {
  return VueApolloComposable.useMutation<IRegisterMutationResult, IRegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IRegisterMutationResult, IRegisterMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($name: String, $bio: String, $avatar: String, $location: String, $website: String, $cover: String, $dateOfBirth: String, $profession: String) {
  updateProfile(
    name: $name
    bio: $bio
    avatar: $avatar
    location: $location
    website: $website
    cover: $cover
    dateOfBirth: $dateOfBirth
    profession: $profession
  )
}
    `;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateProfileMutation({
 *   variables: {
 *     name: // value for 'name'
 *     bio: // value for 'bio'
 *     avatar: // value for 'avatar'
 *     location: // value for 'location'
 *     website: // value for 'website'
 *     cover: // value for 'cover'
 *     dateOfBirth: // value for 'dateOfBirth'
 *     profession: // value for 'profession'
 *   },
 * });
 */
export function useUpdateProfileMutation(options: VueApolloComposable.UseMutationOptions<IUpdateProfileMutationResult, IUpdateProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IUpdateProfileMutationResult, IUpdateProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<IUpdateProfileMutationResult, IUpdateProfileMutationVariables>(UpdateProfileDocument, options);
}
export type UpdateProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IUpdateProfileMutationResult, IUpdateProfileMutationVariables>;
export const UploadPhotoDocument = gql`
    mutation UploadPhoto($file: Upload!) {
  uploadPhoto(file: $file)
}
    `;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadPhotoMutation({
 *   variables: {
 *     file: // value for 'file'
 *   },
 * });
 */
export function useUploadPhotoMutation(options: VueApolloComposable.UseMutationOptions<IUploadPhotoMutationResult, IUploadPhotoMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<IUploadPhotoMutationResult, IUploadPhotoMutationVariables>>) {
  return VueApolloComposable.useMutation<IUploadPhotoMutationResult, IUploadPhotoMutationVariables>(UploadPhotoDocument, options);
}
export type UploadPhotoMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<IUploadPhotoMutationResult, IUploadPhotoMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a Vue component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllPostsQuery();
 */
export function useGetAllPostsQuery(options: VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>(GetAllPostsDocument, {}, options);
}
export function useGetAllPostsLazyQuery(options: VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>(GetAllPostsDocument, {}, options);
}
export type GetAllPostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetAllPostsQueryResult, IGetAllPostsQueryVariables>;
export const GetBookmarkedPostsDocument = gql`
    query GetBookmarkedPosts {
  getBookmarkedPosts {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetBookmarkedPostsQuery__
 *
 * To run a query within a Vue component, call `useGetBookmarkedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkedPostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBookmarkedPostsQuery();
 */
export function useGetBookmarkedPostsQuery(options: VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>(GetBookmarkedPostsDocument, {}, options);
}
export function useGetBookmarkedPostsLazyQuery(options: VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>(GetBookmarkedPostsDocument, {}, options);
}
export type GetBookmarkedPostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetBookmarkedPostsQueryResult, IGetBookmarkedPostsQueryVariables>;
export const GetCommentsDocument = gql`
    query GetComments($comments: [ID!]!) {
  getComments(comments: $comments) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a Vue component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCommentsQuery({
 *   comments: // value for 'comments'
 * });
 */
export function useGetCommentsQuery(variables: IGetCommentsQueryVariables | VueCompositionApi.Ref<IGetCommentsQueryVariables> | ReactiveFunction<IGetCommentsQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetCommentsQueryResult, IGetCommentsQueryVariables>(GetCommentsDocument, variables, options);
}
export function useGetCommentsLazyQuery(variables: IGetCommentsQueryVariables | VueCompositionApi.Ref<IGetCommentsQueryVariables> | ReactiveFunction<IGetCommentsQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetCommentsQueryResult, IGetCommentsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetCommentsQueryResult, IGetCommentsQueryVariables>(GetCommentsDocument, variables, options);
}
export type GetCommentsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetCommentsQueryResult, IGetCommentsQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  getUserById(id: $id) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a Vue component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserByIdQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetUserByIdQuery(variables: IGetUserByIdQueryVariables | VueCompositionApi.Ref<IGetUserByIdQueryVariables> | ReactiveFunction<IGetUserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>(GetUserByIdDocument, variables, options);
}
export function useGetUserByIdLazyQuery(variables: IGetUserByIdQueryVariables | VueCompositionApi.Ref<IGetUserByIdQueryVariables> | ReactiveFunction<IGetUserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>(GetUserByIdDocument, variables, options);
}
export type GetUserByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetUserByIdQueryResult, IGetUserByIdQueryVariables>;
export const GetPostsByUserDocument = gql`
    query GetPostsByUser($userId: ID!) {
  getPostsByUser(userId: $userId) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a Vue component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPostsByUserQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetPostsByUserQuery(variables: IGetPostsByUserQueryVariables | VueCompositionApi.Ref<IGetPostsByUserQueryVariables> | ReactiveFunction<IGetPostsByUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>(GetPostsByUserDocument, variables, options);
}
export function useGetPostsByUserLazyQuery(variables: IGetPostsByUserQueryVariables | VueCompositionApi.Ref<IGetPostsByUserQueryVariables> | ReactiveFunction<IGetPostsByUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>(GetPostsByUserDocument, variables, options);
}
export type GetPostsByUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IGetPostsByUserQueryResult, IGetPostsByUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IMeQueryResult, IMeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IMeQueryResult, IMeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IMeQueryResult, IMeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IMeQueryResult, IMeQueryVariables>;