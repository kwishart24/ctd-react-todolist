import styles from './About.module.css';

function AboutPage() {
  return (
    <div className={styles.about}>
      <h4>By: Kristen Wishart</h4>
      <p>
        This little app is your personal sidekick for staying organized — a cozy
        corner where all your tasks can finally stop living in your brain
        rent&ndash;free. Add new todos, check things off with a satisfying
        click, update them when life changes, and sort or search your list like
        the productivity wizard you secretly are. Behind the scenes, the app
        talks to Airtable to keep everything stored safely, so your tasks stick
        around even if you refresh the page or take a snack break. It&apos;s a
        small but mighty example of how modern web apps work: fetching data,
        updating state, navigating between pages, and keeping everything feeling
        smooth and responsive. Think of it as a friendly little workspace that
        helps you stay on track — simple, clean, and just helpful enough to make
        your day feel a bit more put&ndash;together.
      </p>
      {/* <h5>The Tech Stuff</h5> */}
      <p>
        Under the hood, this app uses:
        <ul>
          <li>React for building the UI</li>
          <li>React Router for switching between pages</li>
          <li>Airtable as the backend database</li>
          <li>Fetch + async/await for API requests</li>
          <li>Optimistic updates so the UI feels fast</li>
          <li>useReducer + useState for managing app state</li>
        </ul>
      </p>
    </div>
  );
}

export default AboutPage;
