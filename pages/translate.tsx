import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Form, Message } from "semantic-ui-react";
import { useEffect, useState } from "react";

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
  const { locale } = router;
  const [socket, setSocket] = useState<WebSocket>(null);
  const t = (path: string) => i18n[path][locale];

  useEffect(() => {
    const socket = new WebSocket("ws://34.142.2.30:80/translate");
    socket.addEventListener("open", () => {
      setSocket(socket);
    });

    socket.addEventListener("message", ({ data }) => {
      setResponse(data);
    });
  }, []);

  const onSubmit = () => {
    socket.send(inputText as string);
  };

  return (
    <Layout title={t("title")}>
      <h1>{t("translate")}</h1>
      <p>{t("greeting")}</p>
      <p>{t("body")}</p>

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
        <Form.Button aria-label="Search" content="translate" icon="language" />
      </Form>
      {response && (
        <Message>
          <p>
            {"translation: "}
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
    </Layout>
  );
};

export default TranslationPage;
