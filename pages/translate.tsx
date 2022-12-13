import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Form, Message } from "semantic-ui-react";
import { useEffect, useState } from "react";

import firebase from "../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

const i18n = {
  greeting: {
    en: "This feature is still in beta. And the uptime will be shared between training and decoding",
    fr: "This feature is still in beta. And the uptime will be shared between training and decoding",
    pt: "This feature is still in beta. And the uptime will be shared between training and decoding",
  },
  body: {
    en: "I'm afraid that at this time, the feature is only available to do English -> Kimbundu translations.",
    fr: "I'm afraid that at this time, the feature is only available to do English -> Kimbundu translations.",
    pt: "I'm afraid that at this time, the feature is only available to do English -> Kimbundu translations.",
  },
  translate: {
    en: "Translate [beta]",
    fr: "Translate [beta]",
    pt: "Translate [beta]",
  },
  title: {
    en: "Translate [beta] | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
    fr: "Translate [beta] | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
    pt: "Translate [beta] | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
  },
};

const TranslationPage = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState<string | number>("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const { locale } = router;
  const t = (path: string) => i18n[path][locale];
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => setAnalytics(getAnalytics(firebase)), []);

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({ text: inputText }),
      });
      const res = await response.text();

      logEvent(analytics, "translation", { inputText, response: res });
      setResponse(res);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Layout title={t("title")}>
      <h1>{t("translate")}</h1>
      <p>{t("greeting")}</p>
      <p>{t("body")}</p>

      <Message info>
        <Message.Header>
          For the sake of debugging and improvements, I'd be very grateful if
          you turned adblock off for this site.
        </Message.Header>
        <Message.Content>
          I do not plan to have ads running for the meantime, but it's difficult
          to fix bugs if I cannot get to the logs
        </Message.Content>
      </Message>

      <p>Some tips:</p>
      <ul>
        <li>
          if the response is empty, then the model has little confidence is the
          translation and sends nothing
        </li>
        <li>
          this model has not been training for long, so the confidence on any
          response cannot be too high
        </li>
        <li>
          especially in mobile, if the response is empty, try to send it again
          without the first letter being capitalised
        </li>
      </ul>

      <Form size="massive" onSubmit={onSubmit}>
        <Form.Group>
          <Form.TextArea
            type="text"
            placeholder={"english text in here..."}
            name="searchText"
            value={inputText}
            onChange={(_, { value }) => setInputText(value)}
          />
        </Form.Group>
        <Form.Button
          disabled={!inputText}
          aria-label="Search"
          content="translate"
          icon="language"
        />
      </Form>
      {response && (
        <Message>
          <p>
            {"current attempt at translation: "}
            <em>
              <strong>{response}</strong>
            </em>
          </p>
          <br />
          <p>
            <strong>Disclaimer:</strong> this is of course, a work in progress,
            and over time, with more data, the accuracy will improve
          </p>
        </Message>
      )}
      {error && (
        <Message error>
          <p>
            <strong>Error:</strong> This service is currently not available
          </p>
        </Message>
      )}
    </Layout>
  );
};

export default TranslationPage;
