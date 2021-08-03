import { useEffect, useState } from "react";
import { getStoryIds } from "../services/hnAPI";

export const StoriesContainer = () => {
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		getStoryIds().then((data) => setStoryIds(data));
	}, []);

	return <p>{storyIds}</p>;
};
