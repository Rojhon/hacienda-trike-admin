export const convertDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    // Format the date and time
    const formattedDateTime = date.toLocaleDateString('en-US', options);

    return formattedDateTime;
};

export const convertDate2 = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    // Format only the date
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};
