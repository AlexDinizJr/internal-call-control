import { type SortOrder } from "../components/SortOrderComponent";

export const getSortParams = (sort: SortOrder) => {
    if (sort === "highestPriority") {
        return { SortBy: "Priority" as const, IsDescending: true };
    }

    if (sort === "lowestPriority") {
        return { SortBy: "Priority" as const, IsDescending: false };
    }

    return { SortBy: "Date" as const, IsDescending: sort === "newest" };
};