import { screen, render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders the card component properly", () => {
    render(<Card />);
    const card = screen.getByText("AmyRobson");
    expect(card).toBeVisible();
  });
});