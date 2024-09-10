function validate(param) {
    if (typeof param !== "string" || !param.trim()) {
        throw new Error("parameter is required and must be a string");
    }

    let arr = param.split("-").map((elm) => {
        return parseInt(elm);
    });

    if (arr[0] < 2024) {
        throw new Error("invalid year value");
    }
    if (arr[1] < 1 || arr[1] > 12) {
        throw new Error("invalid month value");
    }
    if (arr[2] < 1 || arr[2] > 31) {
        throw new Error("invalid day value");
    }
}

module.exports.validate = validate;