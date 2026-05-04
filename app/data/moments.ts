export type Moment = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  palette: string;
  align: 'left' | 'right' | 'center';
};

export const moments: Moment[] = [
  {
    eyebrow: 'Scene 01',
    title: 'The Night Turned Electric',
    body: 'It started like a spark in a quiet room, then everything around us felt brighter, softer, and somehow meant to happen.',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=90',
    palette: 'from-[#030712] via-[#102a43] to-[#120517]',
    align: 'left',
  },
  {
    eyebrow: 'Scene 02',
    title: 'A Sunset With Your Name On It',
    body: 'The sky looked unreal, like it was saving its warmest color just to frame one ordinary day with you.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=90',
    palette: 'from-[#250b07] via-[#a34f24] to-[#15030b]',
    align: 'right',
  },
  {
    eyebrow: 'Scene 03',
    title: 'The City Became Our Playground',
    body: 'Every light looked like a signal, every road felt like a clue, and every laugh became part of our private map.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=90',
    palette: 'from-[#020617] via-[#123c69] to-[#080314]',
    align: 'center',
  },
  {
    eyebrow: 'Scene 04',
    title: 'Rain Made Everything Honest',
    body: 'The heavy days did not erase the magic. They showed us that softness can survive even when the world gets loud.',
    image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1800&q=90',
    palette: 'from-[#061015] via-[#2d5366] to-[#07080d]',
    align: 'left',
  },
  {
    eyebrow: 'Scene 05',
    title: 'Your Calm Feels Like a Garden',
    body: 'Around you, life slows down. Little things bloom. Silence feels safe. Even simple moments start glowing.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=90',
    palette: 'from-[#06160d] via-[#376b4e] to-[#05080a]',
    align: 'right',
  },
  {
    eyebrow: 'Scene 06',
    title: 'Tomorrow Looks Like You',
    body: 'If the future becomes a thousand different skies, I hope every version still finds your light on the horizon.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90',
    palette: 'from-[#18051f] via-[#7d2f78] to-[#08030b]',
    align: 'center',
  },
];
