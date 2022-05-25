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
};

export type Auth = {
  __typename?: 'Auth';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  createUser: User;
  deleteNote?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  login: Auth;
  refreshTokens: Auth;
  register: Auth;
  updateNote: Note;
};


export type MutationCreateNoteArgs = {
  input: NewNote;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshTokensArgs = {
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: NewUser;
};


export type MutationUpdateNoteArgs = {
  id: Scalars['ID'];
  input: UpdateNote;
};

export type NewNote = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type NewUser = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  _id: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['Int'];
  createdBy?: Maybe<User>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  note: Note;
  notes?: Maybe<Array<Maybe<Note>>>;
  user: User;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryNoteArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type UpdateNote = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Array<Maybe<Note>>>;
  password: Scalars['String'];
  updatedAt?: Maybe<Scalars['Int']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', results: { __typename?: 'Auth', token: string, refreshToken: string, user: { __typename?: 'User', _id: string, email: string, name: string } } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', results?: { __typename?: 'User', _id: string, name: string, email: string, notes?: Array<{ __typename?: 'Note', _id: string, title: string, content: string } | null> | null } | null };


export const Login = gql`
    mutation Login($email: String!, $password: String!) {
  results: login(email: $email, password: $password) {
    token
    refreshToken
    user {
      _id
      email
      name
    }
  }
}
    `;
export const GetMe = gql`
    query GetMe {
  results: me {
    _id
    name
    email
    notes {
      _id
      title
      content
    }
  }
}
    `;