document.getElementById('extractButton').addEventListener('click', async () => {
    const query = document.getElementById('query').value;
    if (!query) return;

    const questions = await getPAAQuestions(query);
    document.getElementById('output').textContent = questions.join('\n');
});

async function getPAAQuestions(query) {
    const url = `https://www.google.com/search?gl=gb&hl=en&adtest=off&pws=0&uule=&num=10&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    });
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const questions = [...doc.querySelectorAll('div.related-question-pair')].map(el => el.textContent.trim());
    return questions;
}
