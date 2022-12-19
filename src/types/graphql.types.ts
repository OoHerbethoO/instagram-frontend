import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
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
};

export type IAuthData = {
  token: Scalars['String'];
};

export type IMutation = {
  findUsersByName?: Maybe<Array<Maybe<IUser>>>;
  followOrUnfollowUser?: Maybe<Scalars['Boolean']>;
  login?: Maybe<IAuthData>;
  register?: Maybe<IRegisterResponse>;
  updateProfile?: Maybe<Scalars['Boolean']>;
};


export type IMutationFindUsersByNameArgs = {
  name: Scalars['String'];
};


export type IMutationFollowOrUnfollowUserArgs = {
  userId: Scalars['ID'];
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

export type IQuery = {
  getUserById?: Maybe<IUser>;
  me?: Maybe<IUser>;
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
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  following?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id: Scalars['ID'];
  isVerified?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  totalMessages?: Maybe<Scalars['Int']>;
  totalNotifications?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

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