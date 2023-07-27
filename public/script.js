import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

document.getElementById('findovie').onclick = async () => {
    const prompt = document.querySelector('#movieInput').ariaValueMax;
}