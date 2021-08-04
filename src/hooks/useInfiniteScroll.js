import { useEffect, useState } from "react";

import { STORY_INCREMENT, MAX_STORIES } from "../constants";
import { debounce } from "../utils/debounce";

export const useInfiniteScroll = () => {
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(STORY_INCREMENT);

	const handleScroll = debounce(() => {
		// supposed to return false but it's not working.. will be fixed later
		if (
			window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight ||
			loading
		) {
			return true;
		}
		setLoading(true);
	}, 100);

	useEffect(() => {
		if (!loading) return;

		if (count + STORY_INCREMENT >= MAX_STORIES) {
			setCount(MAX_STORIES);
		} else {
			setCount(count + STORY_INCREMENT);
		}

		setLoading(false);
	}, [loading]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return { count };
};
