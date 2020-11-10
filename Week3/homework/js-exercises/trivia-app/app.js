// function to decode special characters in html copied from https://stackoverflow.com/a/17076120
function decodeHTMLEntities(text) {
  const entities = [
    ['amp', '&'],
    ['apos', "'"],
    ['#x27', "'"],
    ['#x2F', '/'],
    ['#039', "'"],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"'],
  ];
  for (let i = 0, max = entities.length; i < max; ++i)
    // eslint-disable-next-line no-param-reassign
    text = text.replace(new RegExp(`&${entities[i][0]};`, 'g'), entities[i][1]);
  return text;
}

// function to create the questions taking the fetched data as paramater and the the position where to place them
async function getQeustions(data, position) {
  data.results.forEach(element => {
    const question = document.createElement('div');
    question.innerText = decodeHTMLEntities(element.question);
    question.setAttribute('class', 'question');
    const answer = document.createElement('div');
    answer.innerText = decodeHTMLEntities(element.correct_answer);
    answer.setAttribute('class', 'answer');
    position.appendChild(question);
    position.appendChild(answer);
    question.addEventListener('click', event => {
      if (event.target.textContent === element.question) {
        if (answer.style.display === 'none') {
          answer.style.display = 'block';
        } else {
          answer.style.display = 'none';
        }
      }
    });
  });
}

function main() {
  const questionsBox = document.getElementById('question-box');
  async function fetchQuestion() {
    const url = 'https://opentdb.com/api.php?amount=5';
    try {
      const response = await fetch(url);
      const data = await response.json();
      getQeustions(data, questionsBox);
    } catch (error) {
      console.log(error);
    }
  }
  fetchQuestion();
}

window.onload = main;
