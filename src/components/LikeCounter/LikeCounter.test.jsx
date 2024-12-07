import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LikeCounter from "./LikeCounter";

describe("Like Counter", () => {
  test("renders the like counter with a count of 0", () => {
    render(<LikeCounter />);
    const likeCounterElement = screen.getByText("0");
    expect(likeCounterElement).toHaveTextContent("0");
  });

  test("render a count of 1 when the + is clicked", async () => {
    render(<LikeCounter />);
    const plusButton = screen.getByRole("button", { name: "+" });
    const likeCount = screen.getByText("0");
    await userEvent.click(plusButton);
    expect(likeCount).toHaveTextContent("1");
  });
});
