import { useState } from 'preact/hooks';

export default function QuizEntry({ quizList }) {
    const [index, setIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    const current = quizList[Math.min(index, quizList.length - 1)];

    const options = [
        { value: current.bad, score: 1 },
        { value: current.decent, score: 2 },
        { value: current.good, score: 3 },
        { value: current.excellent, score: 4 },
    ]
        .sort(() => Math.random() - 0.5);

    const handleOptionClick = (score) => {
        setCurrentScore((prev) => prev + score);
        setIndex((prev) => prev + 1);
    };

    const maxRawScore = quizList.length * 4;
    const finalScore = Math.round((currentScore / maxRawScore) * 100);

    if (index === quizList.length) {
        return (
            <div class="text-center">
                <h2 class="text-2xl font-medium mb-4">¡Has completado el quiz!</h2>
                <p class="text-lg text-neutral-700">
                    Tu puntuación es <span class="font-bold">{finalScore}%</span>.
                </p>
                {
                    finalScore <= 69 ? (
                        <>
                            <img src="https://media1.tenor.com/m/Iqr3hGy2QjMAAAAd/rosalia-eye.gif" class="h-64 rounded-md mx-auto my-5" />
                            <p>Yo ni na...</p>
                        </>
                    ) : 
                    finalScore <= 70 ? (
                        <>
                            <img src="https://media1.tenor.com/m/kVEXwOxQQ1YAAAAd/santiago-matias-alofoke.gif" class="h-64 rounded-md mx-auto my-5" />
                            <p>Haga su vaina solo compañero/a...</p>
                        </>
                    ) : finalScore <= 80 ? (
                        <>
                            <img src='https://media1.tenor.com/m/kILaxh3EsD0AAAAd/benitomaraj.gif' class="h-64 rounded-md mx-auto my-5" />
                            <p>La cosa ta' fea, pero podría mejorar.</p>
                        </>
                    ) : finalScore <= 85 ? (
                        <>
                            <img src='https://media1.tenor.com/m/hLM-8o9eJfQAAAAC/thumbs-up-dr-michael-robinavitch.gif' class="h-64 rounded-md mx-auto my-5" />
                            <p>Nítido, eres un buen compañero para tesis. No el mejor, pero de los buenos.</p>
                        </>
                    ) : finalScore <= 99 ? (
                        <>
                            <img src='https://media1.tenor.com/m/UtcTV64fz9sAAAAC/goodbye-dr-floyd-reynolds.gif' class="h-64 rounded-md mx-auto my-5" />
                            <p>Ok, tengo que dartela.. Eres de los buenos.</p>
                        </>
                    ) : (
                        <>
                            <img src='https://media1.tenor.com/m/-tNCT2BhFjEAAAAd/hay-es.gif' class="h-64 rounded-md mx-auto my-5" />
                            <p>Eres... wao... 10/10</p>
                        </>
                    )
                }
                <a href="/quiz" class="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150">Reintentar</a>
            </div>
        );
    }

    return (
        <div class="container md:w-2xl mx-auto p-10">
            <span class='text-sm text-neutral-500'>{index + 1}/10</span>
            <h2 class="text-xl font-bold" dangerouslySetInnerHTML={{ __html: current.question }} />

            <ul class="grid gap-4 mt-5">
                {options.map((option, i) => (
                    <li
                        key={i}
                        role='button'
                        class="border select-none border-neutral-200 hover:border-blue-500 hover:outline-3 outline-blue-100 text-neutral-800 hover:text-blue-700 transition-all duration-150 cursor-pointer bg-white py-3 px-4 rounded-lg"
                        onClick={() => handleOptionClick(option.score)}
                        dangerouslySetInnerHTML={{ __html: option.value }}
                    >
                    </li>
                ))}
            </ul>
        </div>
    );
}