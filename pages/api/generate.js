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
  return `Write a diary-style entry for my dnd character (Lu) of about 130 words consisting of what happened in our last session. Here is a brief description of our player characters:
Character 1: Lu (short for Lucrezia) is a circle of the spores druid, she is a member of the guild of the Verdant Grove and is taking a leave from her obligations because she fell out with the members who didn't appreciate her circle specialisation. She is up for anything, but has a hard time trusting people, except her party members..
Character 2: Chaka is a tabaxi rogue who grew up in the streets, he is known for always having an eye for valuable items and loves a good heist.
Character 3: Evgesh is a half-orc barbarian. He can put up a fight, or at least never shies back from one. He will gladly take you up for a good meal and a drink.
Character 4: Bamini is a tiefling sorcerer, she is very knowledgeable and charming, she is part of a sorcerer organisation, the order of the rose. She wants to be a source of good and help people.

Session notes: Lu, Chaka and Evgesh met in Hayport and were given a mission from Baron Mykol. They were supposed to find the mythical city of Deyu, full of gold in the middle of a jungle island, and were given a map, which turned out to be a forgery. The group recruited a dwarf Reis Lindberg, an adventurer, to be their guide to the city and a ship, the Vineyard, and a crew, lead by Captain Garret. They found the original map was in the possession of Chiasma, a former rival at the guild of Lu's. They stole the map from Chiasma's ship without giving up their identity by having Evgesh start a fight with the sailors, insulting their mothers, and Chaka sneaking near the captains cabin, and Lu transforming into an octopus, who was thrown into the cabin window by Chaka and quickly made her way out with the map in her tentacles. The morning after, with Bamini catching up, they left the harbour.

Diary entry: Dear Diary, Last session was quite an adventure! We managed to steal the original map to find the mythical city of Deyu from Chiasma's ship, and now we're on our way to explore the jungle island. Lu doesn't have a huge issue with theft, she finds it kind of exciting, but I think we were all relieved to have the real map in our possession.
Evgesh was his usual self, always ready for a fight. He got us out of a tight spot by starting a brawl with the sailors on Chiasma's ship while Chaka sneaked around to steal the map. It was a risky move, but it worked.
Speaking of Chaka, he's quite the rogue. He grew up in the streets and has an eye for valuable items. I have a feeling he's going to come in handy on this mission, especially if we run into any traps or locked doors.
Bamini was questioning the morality of our mission, given that Baron Mykol is a shady character and an underground boss. She's part of a secret sorcerer organization called the Order of the Rose and wants to be a source of good and help people. I have to admit, her doubts gave me pause. Is it worth risking our lives and potentially doing something dishonorable for the sake of gold and glory? But we've already set sail for Deyu, so I guess it's too late to turn back now.
As for me, I'm excited for the adventure! Hopefully, we can all work together to find the city of Deyu and whatever treasures it holds.
Until next time,
Lucrezia


Session notes: ${animal}
Diary entry:`;
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
