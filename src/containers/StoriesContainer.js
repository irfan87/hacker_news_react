import { useEffect, useState } from "react";
import { Story } from "../components/Story";
import { getStoryIds } from "../services/hnAPI";

export const StoriesContainer = () => {
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		getStoryIds().then((data) => setStoryIds(data));
	}, []);

	return storyIds.map((storyId) => <Story key={storyId} storyId={storyId} />);
};
