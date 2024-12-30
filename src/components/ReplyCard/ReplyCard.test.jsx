import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReplyCard from "./ReplyCard";

describe("Reply Card", () => {
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
  const mockReply = {
    id: 3,
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: "1 week ago",
    score: 4,
    replyingTo: "maxblagun",
    user: {
      image: {
        png: "./images/avatars/image-ramsesmiron.png",
        webp: "./images/avatars/image-ramsesmiron.webp",
      },
      username: "ramsesmiron",
    },
  };

  const mockCurrentUser = {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  };

  const mockReplyText = "";

  const mockfn = vi.fn();

  it("should render the reply card correctly", () => {
    render(
      <ReplyCard
        key={mockReply?.id}
        reply={mockReply}
        setReplies={mockfn}
        currentUser={mockCurrentUser}
        setReplyText={mockfn}
        replyText={mockReplyText}
        replies={mockComment.replies}
        comment={mockComment}
        addReply={mockfn}
        editReply={mockfn}
        deleteReply={mockfn}
      />,
    );
    const replyCardElement = screen.getByText(
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    );
    expect(replyCardElement).toBeVisible();
  });

  it("should allow users to update the score of the reply", async () => {
    render(
      <ReplyCard
        key={mockReply?.id}
        reply={mockReply}
        setReplies={mockfn}
        currentUser={mockCurrentUser}
        setReplyText={mockfn}
        replyText={mockReplyText}
        replies={mockComment.replies}
        comment={mockComment}
        addReply={mockfn}
        editReply={mockfn}
        deleteReply={mockfn}
      />,
    );

    const plusButton = screen.getByTestId("plus-icon");
    const likeCount = screen.getByText("4");
    await userEvent.click(plusButton);
    expect(likeCount).toHaveTextContent("5");
  });

  it("should call set replies function when reply button is clicked", async () => {
    const mocksetReplies = vi.fn();
    render(
      <ReplyCard
        key={mockReply?.id}
        reply={mockReply}
        setReplies={mocksetReplies}
        currentUser={mockCurrentUser}
        setReplyText={mockfn}
        replyText={mockReplyText}
        replies={mockComment.replies}
        comment={mockComment}
        addReply={mockfn}
        editReply={mockfn}
        deleteReply={mockfn}
      />,
    );
    const replyButton = screen.getByRole("button", { name: "Reply" });
    await userEvent.click(replyButton);

    expect(mocksetReplies).toHaveBeenCalledTimes(1);
  });

  it("should render the delete button if the reply card belongs to the current user", () => {
    const mockReplyCurrentUser = {
      id: 3,
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      createdAt: "1 week ago",
      score: 4,
      replyingTo: "maxblagun",
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };
    render(
      <ReplyCard
        key={mockReply?.id}
        reply={mockReplyCurrentUser}
        setReplies={mockfn}
        currentUser={mockCurrentUser}
        setReplyText={mockfn}
        replyText={mockReplyText}
        replies={mockComment.replies}
        comment={mockComment}
        addReply={mockfn}
        editReply={mockfn}
        deleteReply={mockfn}
      />,
    );
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeVisible();
  });
});
