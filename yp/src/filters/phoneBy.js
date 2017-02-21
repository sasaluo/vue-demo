export const phoneBy = function (value,number) {
    if (value) {
        return value.split('转')[number];
    } else {
        return;
    }
};