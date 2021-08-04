import { act } from "react-dom/test-utils";
import { App } from "../App";
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/hnAPI";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";
import { cleanup, render, waitFor } from "@testing-library/react";

beforeEach(cleanup);

jest.mock("../hooks/useInfiniteScroll.js");
jest.mock("../services/hnAPI", () => ({
	getStory: jest.fn(),
	getStoryIds: jest.fn(),
}));

test("renders the application", async () => {
	useInfiniteScroll.mockImplementation(() => ({ count: STORY_INCREMENT }));
	getStory.mockImplementation(() => Promise.resolve(singularStory));
	getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

	const { getByText, queryByTestId } = render(<App />);
	await waitFor(() => [
		expect(getByText("Hacker News Stories")).toBeTruthy(),
		expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
		expect(queryByTestId("story-by").textContent).toEqual("By: John Doe"),
	]);
});
