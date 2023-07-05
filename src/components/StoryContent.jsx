import { Col, Divider, Row } from "antd";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase.js";
import EmptyCard from "./EmptyCard.jsx";
import LoadingCard from "./LoadingCard.jsx";
import StoryCard from "./StoryCard.jsx";

export default function StoryContent() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    const storiesRef = ref(db, "stories");
    const unsubscribe = onValue(
      storiesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setIsLoading(false);
          setError("");
          const result = snapshot.val();
          const exStories = Object.values(result);
          setStories(exStories);
        } else {
          setStories([]);
          setIsLoading(false);
          setError("");
        }
      },
      (err) => {
        setIsLoading(false);
        setError(err?.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <LoadingCard />;
  } else if (error) {
    content = <div>{error}</div>;
  } else if (stories?.length > 0) {
    content = (
      <Row gutter={[15, 15]}>
        {stories.map((story) => (
          <Col xs={12} sm={8} md={6} lg={6} xl={4} xxl={3} key={story?.id}>
            <StoryCard story={story} />
          </Col>
        ))}
      </Row>
    );
  } else {
    content = <EmptyCard />;
  }

  return (
    <>
      <h3>Story</h3>
      <Divider />
      {content}
    </>
  );
}
