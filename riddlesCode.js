const riddleLib = [
  { title: "Bath Riddle",
    riddle: "What gets smaller every time it takes a bath?",
    answer: "Soap", },

  { title: "Crystal From Heaven",
    riddle: "I'm not a blanket, yet I cover the ground; a crystal from heaven that doesn't make a sound. What am I?",
    answer: "Snowflake", },

  { title: "Stick Treat",
    riddle: "I'm sweet and cold with a stick to hold; a treat on a hot day, worth more than gold. What am I?",
    answer: "Popsicle", },

  { title: "Head No Brain",
    riddle: "What has a head but no brain?",
    answer: "Lettuce", },

  { title: "Cat Warrior",
    riddle: "Why do cats make good warriors?",
    answer: "Because they've got nine lives.", },

  { title: "Strange Anatomy",
    riddle: "I have a neck, but no head. I have two arms, but no hands. What am I?",
    answer: "A shirt", },

  { title: "Letter Riddle",
    riddle: "What word contains 26 letters but only has three syllables?",
    answer: "Alphabet", },

  { title: "Comes Down",
    riddle: "What comes down but never goes up?",
    answer: "Rain", },

  { title: "Upside-Down Word",
    riddle: "What five-letter word typed in all capital letters can be read the same upside down?",
    answer: "SWIMS", },

  { title: "What am I?",
    riddle: "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps", },

  { title: "David's Father",
    riddle: "David's father has three sons: Snap, Crackle and _____?",
    answer: "David", },

  { title: "Broken Usefulness",
    riddle: "What is more useful when it is broken?",
    answer: "An egg", },

  { title: "Light But Hard To Throw",
    riddle: "I am easy to lift, but hard to throw. What am I?",
    answer: "A feather", },

  { title: "Sick Boat",
    riddle: "Where do you take a sick boat?",
    answer: "To the dock-tor.", },

  { title: "Expensive Fish",
    riddle: "Which fish costs the most?",
    answer: "A goldfish", },

  { title: "Only Goes Up",
    riddle: "What goes up, but never comes down?",
    answer: "Age", },

  { title: "Cowboy's Horse",
    riddle: "A cowboy rode into town on Friday. He stayed for three nights and rode out on Friday. How is this possible?",
    answer: "His horse's name is Friday.", },

  { title: "Neck No Head",
    riddle: "What has a neck but no head?",
    answer: "A bottle", },

  { title: "Full of Holes",
    riddle: "What is full of holes but still holds water?",
    answer: "A sponge", },

  { title: "Spell COW in Thirteen Letters",
    riddle: "How do you spell COW in thirteen letters?",
    answer: "SEE O DOUBLE YOU.", },

  { title: "Europe Frying Pan",
    riddle: "Why is Europe like a frying pan?",
    answer: "Because it has Greece at the bottom.", },
];

const openRiddle = (num) => {
    num = (((num - 1) % riddleLib.length) + riddleLib.length) % riddleLib.length + 1;
    const idx = num - 1;
    
    const header = document.createElement('div');
    header.innerText = riddleLib[idx].title;

    const riddleBody = document.createElement('div');
    riddleBody.classList.add("riddlebody");
    
    const riddleText = document.createElement('div');
    riddleText.innerText = riddleLib[idx].riddle;
    const answerText = document.createElement('div');
    answerText.innerText = riddleLib[idx].answer;
    answerText.classList.add("spoiler");
    
    riddleBody.append(riddleText);
    riddleBody.append(answerText);

    
    openModal(header, riddleBody, null, null, true);
}