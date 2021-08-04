import { singularStory } from "../fixtures";
import { getStory } from "../services/hnAPI";
import { cleanup, render, waitFor } from "@testing-library/react";
import { Story } from "../components/Story";

beforeEach(() => {
	cleanup();
	jest.resetAllMocks();
});

jest.mock("../services/hnAPI", () => ({
	getStory: jest.fn(),
}));

test("renders the Story with content", async () => {
	getStory.mockImplementation(() => Promise.resolve(singularStory));

	const { getByText, getByTestId } = render(<Story storyId="1" />);
	await waitFor(() => [
		expect(getByTestId("story")).toBeTruthy(),
		expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
		expect(getByTestId("story-by").textContent).toEqual("By: John Doe"),
	]);
});
