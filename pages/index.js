import Head from "next/head";
import { useState, useStickyState, useEffect } from "react";
import styles from "./index.module.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody} from '@coreui/react';
import Log from "./entries.js";
import entries from "./entries.json";
//import "./entries.json";



export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  // function useStickyState(defaultValue, key) {
  //     const [value, setValue] = useState(() => {
  //       const stickyValue = window.localStorage.getItem(key);
  //       return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  //     });
  //     useEffect(() => {
  //       window.localStorage.setItem(key, JSON.stringify(value));
  //     }, [key, value]);
  //     return [value, setValue];
  //   }

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


      if (typeof window !== "undefined") {
      console.log("BATMAN");
      //let existingEntries = JSON.parse(localStorage.getItem("entries")) || [];
      const newEntry = {
        author: "Lu",
        session: entries.length+1,
        content: data.result
        };
      //const updatedEntries = newEntry;
      //localStorage.setItem("entries", JSON.stringify(updatedEntries));
      console.log("newEntry:");

      entries.push(newEntry);

      }




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
        <div className={styles.result}></div>
        </div>
        <div className={styles.log}>
            <CAccordion activeItemKey={1}>
            <Log />
            </CAccordion>
        </div>
      </main>
    </div>
  );
}


//TODO:
// adding entries
// deleting entries
// style input field
// style in general
