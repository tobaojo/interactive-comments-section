import { screen, render } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("Delete Button", () => {
  const mockDeleteFn = vi.fn();
  test("should render the delete button correctly", () => {
    render(<DeleteButton onHandleClick={mockDeleteFn} />);
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeVisible();
  });
});
