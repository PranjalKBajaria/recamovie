import { Configuration, OpenAIApi } from "openai";
// Running into bs issues with openai import
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

document.getElementById('findovie').onclick = async () => {
    const prompt = document.querySelector('#movieInput').value;
    const movies = queryGPT(prompt);
}

async function queryGPT(input) {
    const query = `Recommend me 3 movies based on the following prompt and return the answer in a JSON format \
    with their names (movieNames) in a list. "${input}"`;
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: query }],
    });
  
    const response = JSON.parse(completion.data.choices[0].message.content);
    return response.movies;
  }