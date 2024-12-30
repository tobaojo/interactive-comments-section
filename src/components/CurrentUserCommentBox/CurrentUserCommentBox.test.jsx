import { screen, render } from "@testing-library/react";
import CurrentUserCommentBox from "./CurrentUserCommentBox";
import userEvent from "@testing-library/user-event";

describe("Current User Comment Box", () => {
  const mockCurrentUser = {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  };
  const mockAddComment = vi.fn();
  it("should render the component correctly", () => {
    render(
      <CurrentUserCommentBox
        currentUser={mockCurrentUser}
        addComment={mockAddComment}
      />,
    );
    const currentUserBoxElement = screen.getByPlaceholderText("Add Comment...");
    expect(currentUserBoxElement).toBeVisible();
  });

  it("should allow users to type into the textbox", async () => {
    render(
      <CurrentUserCommentBox
        currentUser={mockCurrentUser}
        addComment={mockAddComment}
      />,
    );
    const textBoxElement = screen.getByPlaceholderText("Add Comment...");
    await userEvent.type(textBoxElement, "this is a test");
    expect(textBoxElement).toHaveValue("this is a test");
  });

  it("should allow users to submit a typed comment and clear the text box", async () => {
    render(
      <CurrentUserCommentBox
        currentUser={mockCurrentUser}
        addComment={mockAddComment}
      />,
    );
    const textBoxElement = screen.getByPlaceholderText("Add Comment...");
    await userEvent.type(textBoxElement, "this is a test");
    const submitBtn = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitBtn);
    expect(textBoxElement).toHaveValue("");
  });
});
