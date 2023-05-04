// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
export const getUniqueId = () => {
    return getRandomWord() + Date.now().toString(36) + Math.floor(
        Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)
    ).toString(36);
}


const getRandomWord = () => {
    const words = ["apple","zebra","lion","pancho","lioness","tough","weak","pretty","monkey","monster","imp","sloth","dragon","house","door","window","air","park","tree","chipmunk","monk","priestess","elephant"];

    const max = words.length - 1;
    const min = 0;
    const index = Math.floor(Math.random() * (max - min + 1) + min);
  
    return words[index];
};


export const isObject = (obj: any) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
