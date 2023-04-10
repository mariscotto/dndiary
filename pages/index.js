import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import 'semantic-ui-css/semantic.min.css';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  //console.log(result);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>DnDiary</title>
        <link rel="icon" href="/dnd.png" />
      </Head>

      <main className={styles.main}>
        <div className="column">
        <img src="/lu.jpg" className={styles.icon} />
        <h3 className="prompt">What happened?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            contentEditable="true"
            name="animal"
            placeholder="Enter session notes"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate diary entry" />
        </form>
        <div className={styles.result}>{result}</div>
        </div>
      </main>
    </div>
  );
}
