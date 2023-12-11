export function checkImageUrl(url: string): Promise<boolean> {
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

export function getObjectDifferences(obj1: any, obj2: any) {
  const differences: any = {};

  for (const key in obj1) {
    if (
      obj1.hasOwnProperty(key) &&
      obj2.hasOwnProperty(key) &&
      obj1[key] !== obj2[key]
    ) {
      differences[key] = obj2[key];
    }
  }

  return differences;
}
