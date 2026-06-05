import { type SortOrder } from "../components/SortOrderComponent";

export const getSortOrder = (sortBy: string | null, isDescending: boolean): SortOrder => {
    if (sortBy === "Priority") {
        return isDescending ? "highestPriority" : "lowestPriority";
    }

    return isDescending ? "newest" : "oldest";
};