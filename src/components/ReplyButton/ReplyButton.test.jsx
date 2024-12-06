import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test } from "vitest";
import ReplyButton from "./ReplyButton";

describe("Reply Button", () => {
  test("Should render the reply button correctly", () => {
    render(<ReplyButton />);
    const replyBtn = screen.getByRole("button", { name: "Reply" });
    expect(replyBtn).toBeInTheDocument();
  });

  test("should call its onClick handler fn when clicked", async () => {
    const handleClick = vi.fn();
    render(<ReplyButton onHandleClick={handleClick} />);
    const user = userEvent.setup();
    const replyBtn = screen.getByText("Reply");
    await user.click(replyBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
