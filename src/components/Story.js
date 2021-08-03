import { useEffect, useState } from "react";
import { getStory } from "../services/hnAPI";

export const Story = ({ storyId }) => {
	const [story, setStory] = useState({});

	useEffect(() => {
		getStory(storyId).then((data) => data && data.url && setStory(data));
	}, []);

	return story && story.url ? (
		<>
			<a href={story.url}>{story.title}</a>
			<p>By: {story.by}</p>
			<p>Posted: {story.time}</p>
		</>
	) : null;
};
