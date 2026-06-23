function calculateProgress(total, completed) {
    return total > 0
        ? Math.round((completed / total) * 100)
        : 0;
}

if (typeof module !== "undefined") {
    module.exports = {
        calculateProgress
    };
}