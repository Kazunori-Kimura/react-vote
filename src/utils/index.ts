/**
 * 引数に渡された object を複製します
 */
export const clone = <T>(obj: T): T => {
    const clonedItem = JSON.parse(JSON.stringify(obj)) as T;
    return clonedItem;
};

export default {
    clone,
};
