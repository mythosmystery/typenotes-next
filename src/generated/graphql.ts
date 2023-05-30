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
  notesUpdateCategory: Scalars['Int'];
  register: Auth;
  userDelete: Scalars['Boolean'];
  userUpdate: User;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationNoteCreateArgs = {
  data: NoteCreateInput;
};


export type MutationNoteDeleteArgs = {
  id: Scalars['String'];
};


export type MutationNoteUpdateArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationNotesUpdateCategoryArgs = {
  newCategory: Scalars['String'];
  oldCategory: Scalars['String'];
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
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  isPublic: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NoteCreateInput = {
  body?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  isPublic: Scalars['Boolean'];
  title: Scalars['String'];
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
  status: Scalars['String'];
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', _id: string, email: string, fullName: string, username: string } } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', _id: string, email: string, fullName: string, username: string } } };

export type NoteUpdateMutationVariables = Exact<{
  id: Scalars['String'];
  body?: InputMaybe<Scalars['String']>;
}>;


export type NoteUpdateMutation = { __typename?: 'Mutation', noteUpdate: { __typename?: 'Note', _id: string, body: string, title: string, createdAt: any, updatedAt: any } };

export type NoteCreateMutationVariables = Exact<{
  data: NoteCreateInput;
}>;


export type NoteCreateMutation = { __typename?: 'Mutation', noteCreate: { __typename?: 'Note', _id: string, body: string, title: string, category: string, isPublic: boolean, createdAt: any, updatedAt: any } };

export type NotesUpdateCategoryMutationVariables = Exact<{
  oldCategory: Scalars['String'];
  newCategory: Scalars['String'];
}>;


export type NotesUpdateCategoryMutation = { __typename?: 'Mutation', notesUpdateCategory: number };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, fullName: string, email: string, notes: Array<{ __typename?: 'Note', _id: string, title: string, body: string, category: string, isPublic: boolean }> } };


export const Login = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    refreshToken
    user {
      _id
      email
      fullName
      username
    }
  }
}
    `;
export const Register = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    accessToken
    refreshToken
    user {
      _id
      email
      fullName
      username
    }
  }
}
    `;
export const NoteUpdate = gql`
    mutation NoteUpdate($id: String!, $body: String) {
  noteUpdate(id: $id, body: $body) {
    _id
    body
    title
    createdAt
    updatedAt
  }
}
    `;
export const NoteCreate = gql`
    mutation NoteCreate($data: NoteCreateInput!) {
  noteCreate(data: $data) {
    _id
    body
    title
    category
    isPublic
    createdAt
    updatedAt
  }
}
    `;
export const NotesUpdateCategory = gql`
    mutation NotesUpdateCategory($oldCategory: String!, $newCategory: String!) {
  notesUpdateCategory(oldCategory: $oldCategory, newCategory: $newCategory)
}
    `;
export const GetMe = gql`
    query GetMe {
  me {
    _id
    fullName
    email
    notes {
      _id
      title
      body
      category
      isPublic
    }
  }
}
    `;