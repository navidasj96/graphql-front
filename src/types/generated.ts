import {useMutation, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {graphqlClient} from "@/providers/graphqlClient";
import {AxiosResponse} from "axios";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

interface FetcherParams<TData, TVariables> {
    endpoint: string
    requestInit: RequestInit
    query: string
    variables?: TVariables
}

interface GraphQLResponse<T> {
    data?: T;
    errors?: Array<{ message: string }>;
}

async function fetcher<TData, TVariables>({
                                              query,
                                              variables,
                                          }: {
    query: string;
    variables: TVariables;
}): Promise<TData> {
    try {
        const response: AxiosResponse<GraphQLResponse<TData>> = await graphqlClient.post('', {
            query,
            variables,
        });

        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }

        return response.data.data!;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch data');
    }
}

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string; }
    String: { input: string; output: string; }
    Boolean: { input: boolean; output: boolean; }
    Int: { input: number; output: number; }
    Float: { input: number; output: number; }
    Date: { input: any; output: any; }
};

export type CreatePostInput = {
    body: Scalars['String']['input'];
    title: Scalars['String']['input'];
};

export type Mutation = {
    __typename?: 'Mutation';
    addRecipe: Recipe;
    createPost: Post;
    reactionPost: Post;
    removePost: Post;
    removeRecipe: Scalars['Boolean']['output'];
    updatePost: Post;
};


export type MutationAddRecipeArgs = {
    newRecipeData: NewRecipeInput;
};


export type MutationCreatePostArgs = {
    createPostInput: CreatePostInput;
};


export type MutationReactionPostArgs = {
    id: Scalars['Int']['input'];
    reaction: Scalars['Float']['input'];
};


export type MutationRemovePostArgs = {
    id: Scalars['Int']['input'];
};


export type MutationRemoveRecipeArgs = {
    id: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
    updatePostInput: UpdatePostInput;
};

export type NewRecipeInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    ingredients: Array<Scalars['String']['input']>;
    title: Scalars['String']['input'];
};

export type Post = {
    __typename?: 'Post';
    body: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    likes: Scalars['Float']['output'];
    title: Scalars['String']['output'];
};

export type Query = {
    __typename?: 'Query';
    post: Post;
    posts: Array<Post>;
    recipe: Recipe;
    recipes: Array<Recipe>;
};


export type QueryPostArgs = {
    id: Scalars['Int']['input'];
};


export type QueryRecipeArgs = {
    id: Scalars['String']['input'];
};


export type QueryRecipesArgs = {
    skip?: Scalars['Int']['input'];
    take?: Scalars['Int']['input'];
};

/** recipe */
export type Recipe = {
    __typename?: 'Recipe';
    creationDate: Scalars['Date']['output'];
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    ingredients: Array<Scalars['String']['output']>;
};

export type Subscription = {
    __typename?: 'Subscription';
    recipeAdded: Recipe;
};

export type UpdatePostInput = {
    body?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['Int']['input'];
    title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostMutationVariables = Exact<{
    createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = {
    __typename?: 'Mutation',
    createPost: { __typename?: 'Post', id: number, title: string, body: string }
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = {
    __typename?: 'Query',
    posts: Array<{ __typename?: 'Post', id: number, body: string, title: string, likes: number }>
};


export const CreatePostDocument = `
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    id
    title
    body
  }
}
    `;


export const useCreatePostMutation = <
    TError = unknown,
    TContext = unknown
>() => {

    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>({

            mutationFn: (variables: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>({
                query: CreatePostDocument,
                variables,
            }),
        }
    )
};

export const GetPostsDocument = `
    query GetPosts {
  posts {
    id
    body
    title
    likes
  }
}
    `;

// export const useGetPostsQuery = <
//     TData = GetPostsQuery,
//     TError = unknown
// >(
//     dataSource: { endpoint?: string, fetchParams?: RequestInit },
//     variables?: GetPostsQueryVariables,
//     options?: UseQueryOptions<GetPostsQuery, TError, TData>
// ) => {
//
//     return useQuery<GetPostsQuery, TError, TData>(
//         variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
//         fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, variables),
//         options
//     )
// };

interface UseGetPostsQueryParams<TError, TData> {
    dataSource: { endpoint?: string, fetchParams?: RequestInit },
    variables?: GetPostsQueryVariables,
    options?: UseQueryOptions<GetPostsQuery, TError, TData>
}

export const useGetPostsQuery = <
    TData = GetPostsQuery,
    TError = unknown
>(
    useGetPostsQueryParams: UseGetPostsQueryParams<TError, TData>
) => {

    // return useQuery<GetPostsQuery, TError, TData>(
    //     useGetPostsQueryParams.variables === undefined ? ['GetPosts'] : ['GetPosts', useGetPostsQueryParams.variables],
    //     fetcher<GetPostsQuery, GetPostsQueryVariables>(useGetPostsQueryParams.dataSource.endpoint, useGetPostsQueryParams.dataSource.fetchParams || {}, GetPostsDocument, useGetPostsQueryParams.variables),
    //     useGetPostsQueryParams.options
    // )

    return useQuery({
        queryKey: ["allPosts"],
        queryFn: () => fetcher<TData, unknown>({query: GetPostsDocument, ...useGetPostsQueryParams.dataSource})(),
    })
};
