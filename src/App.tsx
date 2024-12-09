import Card from "./components/Card/Card";
import CurrentUserCommentBox from "./components/CurrentUserCommentBox/CurrentUserCommentBox";
import { useComments, useCurrentUser } from "./hooks/useGetData";
import { type Comment } from "./types/types";

function App() {
  const [
    currentUser,
    { isLoading: isCurrentUserLoading, error: CurrentUserError },
  ] = useCurrentUser();
  const [comments, { isLoading, error }] = useComments();

  return (
    <div className="container relative flex flex-col self-center h-screen text-grayishBlue p-4 m-4 ">
      {error && <p>Error: {error}</p>}
      {isLoading && <p>loading...</p>}
      {comments &&
        comments?.map((comment: Comment) => (
          <Card key={comment?.id} comment={comment} />
        ))}
      {CurrentUserError && <p>Error: {error}</p>}
      {isCurrentUserLoading && <p>loading...</p>}
      {currentUser && <CurrentUserCommentBox currentUser={currentUser} />}
    </div>
  );
}

export default App;
