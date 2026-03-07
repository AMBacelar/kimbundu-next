import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const [inputText, setInputText] = useState<string>("");
  const [previousRequest, setPreviousRequest] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const { locale } = router;
  const t = (path: string) => i18n[path][locale];
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setAnalytics(getAnalytics(firebase)), []);

  const training = true;

  const onSubmit = async () => {
    if (!training) {
      setLoading(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          body: JSON.stringify({ text: inputText }),
        });
        const text = await res.text();

        logEvent(analytics, "translation", {
          inputText,
          response: text,
          raw: `${inputText} -> ${text}`,
        });
        setResponse(text);
        setPreviousRequest(inputText);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout title={t("title")}>
      <h1 className="mb-4 text-2xl font-bold">{t("translate")}</h1>
      <p className="mb-2">{t("greeting")}</p>
      <p className="mb-4">{t("body")}</p>

      <Alert className="mb-4">
        <AlertTitle>A note on ad blockers</AlertTitle>
        <AlertDescription>
          For the sake of debugging and improvements, I&apos;d be very grateful
          if you turned adblock off for this site. I do not plan to have ads
          running for the meantime, but it&apos;s difficult to fix bugs if I
          cannot get to the logs.
        </AlertDescription>
      </Alert>

      <p className="mb-2 font-medium">Some tips:</p>
      <ul className="mb-6 list-disc pl-5 text-sm space-y-1">
        <li>
          This model has been trained on about 60% of the English and Kimbundu
          bible, so there isn&apos;t going to be much scope beyond that at this time
        </li>
        <li>
          if the response is empty, then the model has little confidence in the
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

      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Translator service is currently down</AlertTitle>
        <AlertDescription>
          The developer is currently procuring text and paying for text to be
          made to add to the content that can be used to train the model. Please
          keep note of updates on{" "}
          <a
            href="https://twitter.com/KimbunduOnline"
            className="underline underline-offset-4"
          >
            the official twitter for this project
          </a>
          .
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        <Textarea
          placeholder="english text in here..."
          name="searchText"
          value={inputText}
          disabled={training}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[120px]"
        />
        <Button
          onClick={onSubmit}
          disabled={!inputText || loading || inputText === previousRequest || training}
          aria-label="Translate"
        >
          Translate
        </Button>
      </div>

      {response && (
        <Alert className="mt-4">
          <AlertDescription>
            <p>
              {"current attempt at translation: "}
              <em>
                <strong>{response}</strong>
              </em>
            </p>
            <p className="mt-2">
              <strong>Disclaimer:</strong> this is of course, a work in
              progress, and over time, with more data, the accuracy will improve
            </p>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            <strong>Error:</strong> This service is currently not available
          </AlertDescription>
        </Alert>
      )}
    </Layout>
  );
};

export default TranslationPage;
