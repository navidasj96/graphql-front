'use client'

import {useCreatePostMutation} from "@/types/generated";

const MainPage = () => {

    // const {data} = useGetPostsQuery({dataSource: {endpoint: ''}});
    const {mutate, isPending, isError, error} = useCreatePostMutation();


    const createPostHandler = () => {
        mutate({
            createPostInput: {title: 'Hello', body: 'World'}
        });
    }
    return (
        <div>
            hello
            <button onClick={() => createPostHandler()}>create post </button>
        </div>
    )

}

export default MainPage;