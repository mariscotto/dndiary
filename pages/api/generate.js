import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter session notes",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 1,
      max_tokens:500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  return `Write a letter from my dnd character (Lu) to her friend Talia of about 130 words consisting of what happened in our last session. Here is a brief description of our player characters:
Character 1: Lu (short for Lucrezia) is a circle of the spores druid, she is a member of the guild of the Verdant Grove and is taking a leave from her obligations because she fell out with the members who didn't appreciate her circle specialisation. She is up for anything, but has a hard time trusting people, except her party members..
Character 2: Chaka is a tabaxi rogue who grew up in the streets, he is known for always having an eye for valuable items and loves a good heist.
Character 3: Evgesh is a half-orc barbarian. He can put up a fight, or at least never shies back from one. He will gladly take you up for a good meal and a drink.
Character 4: Bamini is a tiefling sorcerer, she is very knowledgeable and charming, she is part of a sorcerer organisation, the order of the rose. She wants to be a source of good and help people.

Session notes: Me, Chaka and Evgesh met in Hayport, after a bar fight starring Evgesh turned deadly. Evgesh's deceased opponent was one of Baron Mykol's fighters and he "invited" us back to his headquarters. There he asked us to acquire a hand or a foot of a recently deceased human person to cover the debt from the fighter's death. Seeing as we had no other choice, we accepted the deal. We first went to find a hospital where we hoped an amputee might help us. We were met by Dr Beylore who mistrusted us from the start. Then we tried our luck at a nearby morgue, where Morguen invited us for tea and biscuits. The location was quite creepy, we all felt a strange darkness. In the end, we found a recently diseased bard and took his hand to present to the baron. He seemed happy.

Letter: Dear Talia, We had quite the adventure last night! Chaka, Evgesh and I were at a bar and suddenly, it was thrown into chaos after Evgesh started a fight that ended in some unfortunate deaths. We were invited to Baron Mykol's headquarters and he asked us to acquire a hand... of a recently deceased human person. Talk about a gruesome mission! Wwe thought a hospital would be our best bet. We met with the doctor but he didn't look too pleased to see us. Then we tried our luck at the morgue, a very creepy location where we met Morguen. The man wasn't pleased to be disturbed, but we found what we were looking for: The hand of a recently deceased bard. The Baron seemed pleased and we left the place in a hurry. We completed the task we were assigned, but I can't help but think about it. I hope the bard wanted to give away his hand as a final gift, or at least that's how I'd like to think of it. Anyway, that's all that happened lately. I hope you're well and I'll tell you more the next time we meet. Warm regards, Lu

Session notes: ${animal}
Letter:`;
}


/* function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
} */
