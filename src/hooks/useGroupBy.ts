import _ from "lodash";

const useGroupBy = (arr: any[]): any[] => {
    const grouped = _.groupBy(arr, (a) => {
        if (a.category) return a.category["name"]
        return a.category
    });
    return [grouped]
}
export default useGroupBy;