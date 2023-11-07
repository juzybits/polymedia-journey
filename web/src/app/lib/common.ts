// Miscellaneous convenience functions and constants

// Check if an image exists behind a given URL
export function isImageUrl(imageUrl: string): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
        var img = new Image();
        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            resolve(false);
        };
        img.src = imageUrl;
    });
}

/*
// Check if an image exists behind a given URL
export async function isImageUrl_DEPRECATED(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');
        return Boolean( contentType && contentType.startsWith('image/') );
    } catch (error) {
        return false;
    }
}
*/
