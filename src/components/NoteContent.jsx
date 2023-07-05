import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import NoteCard from "./NoteCard";
import EmptyCard from "./EmptyCard";
import LoadingCard from "./LoadingCard";

export default function NoteContent() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    const notesRef = ref(db, "notes");
    const unsubscribe = onValue(
      notesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setIsLoading(false);
          setError("");
          const result = snapshot.val();
          const exNotes = Object.values(result);
          setNotes(exNotes);
        } else {
          setNotes([]);
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
  } else if (notes?.length > 0) {
    content = (
      <Row gutter={[15, 15]}>
        {notes.map((note) => (
          <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={note?.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    );
  } else {
    // content = <Empty>No Notes Found!</Empty>;
    content = <EmptyCard />;
  }

  return (
    <>
      <h3>Note</h3>
      <Divider />
      {content}
    </>
  );
}
