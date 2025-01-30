export function random(len: number) {
    // Define a string containing possible characters for the random string.
    let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
    let length = options.length;

    // Initialize an empty string to store the result.
    let ans = "";

    // Loop `len` times to construct the random string.
    for (let i = 0; i < len; i++) {
        // Generate a random index and append the corresponding character from `options` to `ans`.
        ans += options[Math.floor(Math.random() * length)];
    }

    // Return the final random string.
    return ans;
}