import { useEffect, useState } from "react";
import { Story } from "../components/Story";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { getStoryIds } from "../services/hnAPI";
import {
	GlobalStyle,
	StoriesContainerWrapper,
} from "../styles/StoriesContainerStyles";

export const StoriesContainer = () => {
	const { count } = useInfiniteScroll();
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		getStoryIds().then((data) => setStoryIds(data));
	}, []);

	return (
		<>
			<GlobalStyle />
			<StoriesContainerWrapper data-testid="stories-container">
				<h1>Hacker News Stories</h1>
				{storyIds.slice(0, count).map((storyId) => (
					<Story key={storyId} storyId={storyId} />
				))}
			</StoriesContainerWrapper>
		</>
	);
};
