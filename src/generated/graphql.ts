import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Auth;
  noteCreate: Note;
  noteDelete: Scalars['Boolean'];
  noteUpdate: Note;
  register: Auth;
  userDelete: Scalars['Boolean'];
  userUpdate: User;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationNoteCreateArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationNoteDeleteArgs = {
  id: Scalars['String'];
};


export type MutationNoteUpdateArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUserUpdateArgs = {
  data: UserInput;
};

export type Note = {
  __typename?: 'Note';
  _id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  noteById: Note;
  noteByUser: Array<Note>;
  noteMany: Array<Note>;
};


export type QueryNoteByIdArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  notes: Array<Note>;
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserInput = {
  fullName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', results: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', _id: string, email: string, fullName: string } } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', results: { __typename?: 'User', _id: string, fullName: string, email: string, notes: Array<{ __typename?: 'Note', _id: string, title: string, body: string }> } };


export const Login = gql`
    mutation Login($data: LoginInput!) {
  results: login(data: $data) {
    accessToken
    refreshToken
    user {
      _id
      email
      fullName
    }
  }
}
    `;
export const GetMe = gql`
    query GetMe {
  results: me {
    _id
    fullName
    email
    notes {
      _id
      title
      body
    }
  }
}
    `;