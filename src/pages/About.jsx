export default function About() {
  /*
QuickQuiz is a quiz game built by Sam4Web using React JS framework, where the user can select a category and has to answer 10 questions from opentdb.com API. Project was inspired by the QuizMaster quiz app. The Open Trivia Database provides completely free JSON API for use in programming projects.
*/

  return (
    <>
      <section className='about-section'>
        <div className='section-container'>
          <h1 className='title'>About</h1>
          <p className='content'>
            <span className='color'>QuickQuiz</span> is a quiz game built by{' '}
            <a href='https://github.com/sam4web' className='link'>
              Sam4Web
            </a>{' '}
            using React JS framework, where the user can select a category and
            has to answer 10 questions from{' '}
            <a href='https://opentdb.com/' className='link'>
              opentdb.com
            </a>{' '}
            API. Project was inspired by the QuizMaster quiz app. The Open
            Trivia Database provides completely free JSON API for use in
            programming projects.{' '}
          </p>
        </div>
      </section>
    </>
  );
}
