import Card from "./components/Card/Card";
import CurrentUserCommentBox from "./components/CurrentUserCommentBox/CurrentUserCommentBox";
import { useComments, useCurrentUser } from "./hooks/useGetData";
import { type Comment } from "./types/types";

function App() {
  const [
    currentUser,
    { isLoading: isCurrentUserLoading, error: CurrentUserError },
  ] = useCurrentUser();
  const [comments, { isLoading, error, addComment, addReply }] = useComments();

  if (error || CurrentUserError) {
    return <p>Error: {error || CurrentUserError}</p>; // Show error state
  }

  if (
    comments.length === 0 ||
    isLoading ||
    isCurrentUserLoading ||
    !currentUser
  ) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container relative flex flex-col self-center text-grayishBlue p-4 m-4 ">
      {comments &&
        comments?.map((comment: Comment) => (
          <Card
            key={comment?.id}
            comment={comment}
            addReply={addReply}
            currentUser={currentUser}
          />
        ))}

      {currentUser && (
        <CurrentUserCommentBox
          currentUser={currentUser}
          addComment={addComment}
        />
      )}
    </div>
  );
}

export default App;
