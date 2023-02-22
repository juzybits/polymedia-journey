// Miscellaneous convenience functions and constants

// Transform a long string like "startXXXXXXend" into "start...end"
export function shorten(text: string, start=6, end=4, separator='..'): string {
    return !text ? '' : text.slice(0, start) + separator + (end?text.slice(-end):'')
}

// Check if an image exists behind a given URL
export async function isImageUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');
        return Boolean( contentType && contentType.startsWith('image/') );
    } catch (error) {
        return false;
    }
}
