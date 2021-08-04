import axios from "axios";
import {
	getStoryIds,
	getStory,
	newStoriesURL,
	storyURL,
} from "../services/hnAPI";
import { singularStory, storyIds, emptySingularStory } from "../fixtures";

jest.mock("axios");

describe("HackerNews Api", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe("getStory", () => {
		it("requests and gets a story from the HN Api", async () => {
			axios.get.mockImplementation(() =>
				Promise.resolve({ data: singularStory })
			);

			const entity = await getStory(1);

			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`);
			expect(entity).toEqual(singularStory);
		});

		it("does not retrieved a story from the HN Api, but handles gracefully", async () => {
			axios.get.mockImplementation(() =>
				Promise.resolve({ data: emptySingularStory })
			);

			const entity = await getStory(2);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith(`${storyURL + 2}.json`);
			expect(entity).toEqual(emptySingularStory);
		});
	});

	describe("getStoryIds", () => {
		it("requests and gets story ids from the HN Api", async () => {
			axios.get.mockImplementation(() => Promise.resolve({ data: storyIds }));

			const entity = await getStoryIds(1);

			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith(newStoriesURL);
			expect(entity).toEqual(storyIds);
		});
	});
});
