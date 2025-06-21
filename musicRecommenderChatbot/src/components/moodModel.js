const keywords = {
    happy: ["mutlu", "iyi", "harika", "neşeli", "sevinçli"],
    sad: ["üzgün", "mutsuz", "kötü", "hüzünlü"],
    angry: ["sinirli", "öfkeliyim", "gergin"],
    tired: ["yorgun", "bitkin", "uykusuz"]
  };
  
  const predictMood = async (text) => {
    text = text.toLowerCase();
    for (const [mood, words] of Object.entries(keywords)) {
      if (words.some(word => text.includes(word))) {
        return mood;
      }
    }
    return "happy"; // varsayılan
  };
  
  export default predictMood;
  