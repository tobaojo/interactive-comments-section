import { screen, render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  const mockFn = vi.fn();
  const mockComment = {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    replies: [],
  };

  const mockCurrentUser = {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  };

  const mockCommentCurrentUser = {
    id: 1,
    content: "This is a test comment",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    replies: [],
  };
  it("renders the card component properly", () => {
    render(
      <Card
        key={mockComment.id}
        currentUser={mockCurrentUser}
        comment={mockComment}
        addReply={mockFn}
        editComment={mockFn}
        editReply={mockFn}
        deleteComment={mockFn}
      />,
    );
    const card = screen.getByRole("heading", { name: "amyrobson" });
    expect(card).toBeVisible();
  });

  it("should render a 'you' tag if the card belongs to the current user", () => {
    render(
      <Card
        key={mockCommentCurrentUser.id}
        currentUser={mockCurrentUser}
        comment={mockCommentCurrentUser}
        addReply={mockFn}
        editComment={mockFn}
        editReply={mockFn}
        deleteComment={mockFn}
      />,
    );

    const youTag = screen.getByText("you");
    expect(youTag).toBeVisible();
  });

  it("should render the like counter component", () => {
    render(
      <Card
        key={mockComment.id}
        currentUser={mockCurrentUser}
        comment={mockCommentCurrentUser}
        addReply={mockFn}
        editComment={mockFn}
        editReply={mockFn}
        deleteComment={mockFn}
      />,
    );
    const likeCounter = screen.getByText("12");
    expect(likeCounter).toBeVisible();
  });
});
