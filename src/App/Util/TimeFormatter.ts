export const TimeFormatterFactory = (options: Intl.DateTimeFormatOptions = {}) => {
    const formatter = new Intl.DateTimeFormat('en-us', {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        hourCycle: "h24",
        ...options,
    });

    return (date) => formatter.format(date);
};
