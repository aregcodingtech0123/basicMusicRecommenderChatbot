const moodToSongs = {
    happy: [
      "Pharrell Williams - Happy",
      "Justin Timberlake - Can't Stop The Feeling",
      "Katy Perry - Firework",
    ],
    sad: [
      "Adele - Someone Like You",
      "Billie Eilish - everything i wanted",
      "Sam Smith - Too Good at Goodbyes",
    ],
    angry: [
      "Linkin Park - Numb",
      "Eminem - Lose Yourself",
      "System Of A Down - Toxicity",
    ],
    relaxed: [
      "Norah Jones - Don't Know Why",
      "John Mayer - Gravity",
      "Coldplay - Yellow",
    ],
};

// getMood fonksiyonunda daha kesin eşleştirmeler sağlayın
const getMood = (text) => {
  text = text.toLowerCase().replace(/[.,!?]/g, ""); 
  
  // Debug için
  console.log("Aranan metin:", text);
  
  if (/(^|\s)(mutlu|mutluyum|iyi|neşeli|sevinçli|şen|harika|mükemmel|çok iyiyim|enerjik|happy|joyful|cheerful|great|excellent|energetic)(\s|$)/.test(text)) {
      console.log("Happy mood bulundu");
      return "happy";
  }
  if (/(^|\s)(üzgün|mutsuz|hüzün|sıkıntı|üzgünüm|kötü|keder|depres|sıkıl|bunal|acı|canım sıkkın|sad|unhappy|gloomy|upset|miserable|depressed|lonely)(\s|$)/.test(text)) {
      console.log("Sad mood bulundu");
      return "sad";
  }
  
  
  console.log("Mood bulunamadı");
  return null;
};

export const suggestSongByMood = (userText) => {
    const mood = getMood(userText);
    if (!mood) {
      return "I couldn't understand your mood 😔 Please try words like 'I'm sad' or 'I'm happy' as examples.";
    }
    const songs = moodToSongs[mood];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    return `Here is my recommendation for you: 🎶 ${randomSong}`;
};