import openai from 'https://cdn.jsdelivr.net/npm/openai@3.3.0/+esm'

const configuration = new openai.Configuration({
  apiKey: "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",
});

delete configuration.baseOptions.headers['User-Agent'];

const openAI = new openai.OpenAIApi(configuration);

document.getElementById('findMovie').onclick = async () => {
    const prompt = document.querySelector('#movieInput').value;
    const recommendations = await queryGPT(prompt);
    await recommendations.forEach( async rec => {
      const movie = await getMovieDetails(rec);
      addMovie(movie);
    })
}


function addMovie(movie) {
  const container = document.createElement('div');
  container.classList.add('flex', 'h-64', 'w-full', 'border-2', 'rounded-lg', 'mx-auto', 'mt-14');
  const _div1 = document.createElement('div');
  _div1.classList.add('flex-row', 'h-full', 'shrink-0', 'max-w-fit');
  _div1.id = 'cardPic';
  const _image = document.createElement('img');
  _image.classList.add('h-full', 'shrink-0', 'w-auto', 'p-1', 'border-0', 'rounded-lg');
  _image.src = movie.image;
  _image.setAttribute("loading", "lazy");
  _div1.appendChild(_image);
  const _div2 = document.createElement('div');
  _div2.id = 'cardInfo';
  _div2.classList.add('flex-row', 'h-full', 'w-full', 'mr-2', 'ml-1', 'mt-2');
  const _div3 = document.createElement('div');
  _div3.classList.add('flex', 'flex-col','w-full');
  const _div4 = document.createElement('div');
  _div4.classList.add('flex', 'justify-center', 'text-center');
  const _h1 = document.createElement('h1');
  _h1.classList.add('w-full', 'mb-3', 'text-2xl', 'leading-none');
  const _span1 = document.createElement('span');
  _span1.id = 'title';
  _span1.innerText = `${movie.title} `;
  const _span2 = document.createElement('span');
  _span2.id = 'year';
  _span2.innerText = movie.year;
  _span2.className = 'text-xl';
  _h1.appendChild(_span1);
  _h1.appendChild(_span2);
  _div4.appendChild(_h1);
  const _div5 = document.createElement('div');
  const _div6 = document.createElement('div');
  _div6.id = 'runTime';
  _div6.classList.add('float-left', 'text-md', 'font-medium', 'text-slate-500');
  _div6.innerText = movie.runTime;
  const _div7 = document.createElement('div');
  _div7.id = 'imdb';
  _div7.classList.add('float-right', 'text-xs', 'leading-6', 'font-medium', 'uppercase', 'text-slate-500');
  _div7.innerText = `imdB: ${movie.rating}`;
  _div5.appendChild(_div6);
  _div5.appendChild(_div7);
  const _div8 = document.createElement('div');
  _div8.classList.add('flex', 'justify-center', 'items-center', 'mt-4', 'mr-2', 'ml-1', 'mb-2', 'text-sm', 'text-center', 'font-small');
  const _p1 = document.createElement('p');
  _p1.innerText = movie.summary;
  _div8.appendChild(_p1);
  _div3.appendChild(_div4);
  _div3.appendChild(_div5);
  _div3.appendChild(_div8);
  _div2.appendChild(_div3);
  container.appendChild(_div1);
  container.appendChild(_div2);
  document.getElementById('recommendations').appendChild(container);
};

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
  const response = await fetch(`http://localhost:3000/search/${searchterm}`);
  const body = await response.json();
  console.log(body)
  return body;
}