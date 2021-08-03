import axios from "axios";
import { selectFields } from "../selectors/selectFields";

// baseURL
export const baseURL = "https://hacker-news.firebaseio.com/v0/";
export const newStoriesURL = `${baseURL}newstories.json`;
export const storyURL = `${baseURL}item/`;

// get a story from hacker news
export const getStory = async (storyId) => {
	const result = await axios
		.get(`${storyURL + storyId}.json`)
		.then(({ data }) => data && selectFields(data));

	return result;
};

// get the story ids from the hacker news
export const getStoryIds = async () => {
	const result = await axios.get(newStoriesURL).then(({ data }) => data);

	return result;
};
