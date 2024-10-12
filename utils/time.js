export function timeAgo(savedDate) {
    const currentDate = new Date() / 1000;
    const timeDiff = (currentDate - savedDate); // Time difference in seconds

    // Time units
    const seconds = Math.floor(timeDiff);
    const minutes = Math.floor(timeDiff / 60);
    const hours = Math.floor(timeDiff / 3600);
    const days = Math.floor(timeDiff / 86400);
    const weeks = Math.floor(timeDiff / (86400 * 7));
    const months = Math.floor(timeDiff / (86400 * 30.44)); // Approximate month length
    const years = Math.floor(timeDiff / (86400 * 365.25)); // Approximate year length

    // Determine which unit to use and return the corresponding string
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else if (weeks < 4) {
        return `${weeks} weeks ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {
        return `${years} years ago`;
    }
}

export function timeUntil(target) {
    let diff = new Date(target) - new Date();
    if (diff <= 0) return "00:00:00:00";
    let d = Math.floor(diff / (1000 * 60 * 60 * 24)),
        h = Math.floor((diff / (1000 * 60 * 60)) % 24),
        m = Math.floor((diff / (1000 * 60)) % 60),
        s = Math.floor((diff / 1000) % 60);
    return `${String(d).padStart(2, '0')}:${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}