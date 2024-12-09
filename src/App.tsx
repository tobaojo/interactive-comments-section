import Card from "./components/Card/Card";
import { useComments, useCurrentUser } from "./hooks/useGetData";
import { type Comment, type User } from "./types/types";

function App() {
  const [currentUser] = useCurrentUser();
  const [comments, { isLoading, error }] = useComments();
  console.log(currentUser);
  console.log(comments);
  return (
    <div className="container flex flex-col self-center h-[50vh] text-grayishBlue p-4 m-4">
      {error && <p>Error: {error}</p>}
      {isLoading && <p>ho</p>}
      {comments &&
        comments?.map((comment: Comment) => (
          <Card key={comment?.id} comment={comment} />
        ))}
    </div>
  );
}

export default App;
