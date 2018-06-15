export const createFSA = (type) =>
    (payload) => {
        if (payload === undefined) {
            return {type};
        } else if (payload instanceof Error) {
            return {type, error: true, payload};
        }

        return {type, payload};
    };