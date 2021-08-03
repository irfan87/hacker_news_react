import { useEffect, useState } from "react";
import { getStory, getStoryIds } from "../services/hnAPI";

export const StoriesContainer = () => {
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		getStoryIds().then((data) => setStoryIds(data));

		// storyIds && storyIds.length > 0

		getStory(20970623).then((data) => console.log(data));
	}, []);

	return <p>{storyIds}</p>;
};
