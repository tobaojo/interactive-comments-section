import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LikeCounter from "./LikeCounter";

describe("Like Counter", () => {
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

  const mockScore = mockComment.score;

  test("renders the like counter with a count of 0", () => {
    render(<LikeCounter score={mockScore} comment={mockComment} />);
    const likeCounterElement = screen.getByText("12");
    expect(likeCounterElement).toHaveTextContent("12");
  });

  test("render a count of +1 when the + is clicked", async () => {
    render(<LikeCounter score={mockScore} comment={mockComment} />);
    const plusButton = screen.getByTestId("plus-icon");
    const likeCount = screen.getByText("12");
    await userEvent.click(plusButton);
    expect(likeCount).toHaveTextContent("13");
  });

  test("render a count of -1 when the - is clicked", async () => {
    render(<LikeCounter score={mockScore} comment={mockComment} />);
    const minusButton = screen.getByTestId("minus-icon");
    const likeCount = screen.getByText("12");
    await userEvent.click(minusButton);
    expect(likeCount).toHaveTextContent("11");
  });
});
