import openai from 'https://cdn.jsdelivr.net/npm/openai@3.3.0/+esm'

const configuration = new openai.Configuration({
  apiKey: "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",
});

delete configuration.baseOptions.headers['User-Agent'];

const openAI = new openai.OpenAIApi(configuration);

document.getElementById('findMovie').onclick = async () => {
    const prompt = document.querySelector('#movieInput').value;
    const movies = await queryGPT(prompt);
    console.log(getMovieDetails(movies[0]));
}

async function queryGPT(input) {
    const query = `Recommend me 3 movies based on the following prompt and return the answer in a JSON format \
    with their names (movieNames) in a list. "${input}"`;
  
    const completion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: query }],
    });
  
    const response = JSON.parse(completion.data.choices[0].message.content);
    return response.movieNames;
  }

  async function getMovieDetails(name) {
    // get the correct search term using the fillers for spaces
    const searchterm = name.split(' ').join('%20');
    const response = await fetch(`https://www.imdb.com/find/?q=${searchterm}`);
    const body = await response.json();
    return body;
  }