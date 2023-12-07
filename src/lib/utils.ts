export function checkImageUrl(url: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(true);
    };

    image.onerror = () => {
      resolve(false);
    };

    image.src = url;
  });
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
