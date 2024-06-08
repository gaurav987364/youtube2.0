import React from 'react';
import moment from 'moment';

function formatPublishedDate(publishedAt) {
    const now = moment();
    const publishedDate = moment(publishedAt);
    const duration = moment.duration(now.diff(publishedDate));
    
    // Calculate years, months, days, hours, or minutes
    if (duration.years() > 0) {
        return `${duration.years()} years ago`;
    } else if (duration.months() > 0) {
        return `${duration.months()} months ago`;
    } else if (duration.days() > 0) {
        return `${duration.days()} days ago`;
    } else if (duration.hours() > 0) {
        return `${duration.hours()} hours ago`;
    } else if (duration.minutes() > 0) {
        return `${duration.minutes()} minutes ago`;
    } else {
        return 'just now';
    }
}

function VideoPublishedAt({ publishedAt }) {
    const formattedPublishedDate = formatPublishedDate(publishedAt);

    return (
        <div>
            Published {formattedPublishedDate}
        </div>
    );
}

export default VideoPublishedAt;
