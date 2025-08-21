  export function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diff = now - past;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours   = Math.floor(minutes / 60);
        const days    = Math.floor(hours / 24);
        const weeks   = Math.floor(days / 7);
        const months  = Math.floor(days / 30);
        const years   = Math.floor(days / 365);

        if (seconds < 60) return `${seconds} с. тому`;
        if (minutes < 60) return `${minutes} хв. тому`;
        if (hours < 24) return `${hours} год. тому`;
        if (days < 7) return `${days} д. тому`;
        if (weeks < 5) return `${weeks} т. тому`;
        if (months < 12) return `${months} м. тому`;
        return `${years} р. тому`;
    }