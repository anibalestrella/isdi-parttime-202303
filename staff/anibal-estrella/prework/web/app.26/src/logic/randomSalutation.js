const salutations = [
    "Long time no see!",
    "What's crackin'?",
    "How's it going?",
    "What's up, my friend?",
    "What's good?",
    "Let's catch up!",
]

export default function randomSalutation() {
    const randomNumber = Math.floor(Math.random() * salutations.length);
    return salutations[randomNumber];
};