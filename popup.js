document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('query-form');
    const resultDiv = document.getElementById('results');
    const apiKey = '1f77c599428a4b1943b9aa49eb162aefdf43f595b0f0eab49dd26b1a099c9653'; // Replace with your actual API key

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = document.getElementById('query').value;

        fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                resultDiv.innerHTML = ''; // Clear previous results
                const questions = data['related_questions'];
                if (questions && questions.length > 0) {
                    questions.forEach(question => {
                        const p = document.createElement('p');
                        p.textContent = question.question;
                        resultDiv.appendChild(p);
                    });
                } else {
                    resultDiv.textContent = 'No questions found.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultDiv.textContent = 'Error fetching data. Please try again.';
            });
    });
});
