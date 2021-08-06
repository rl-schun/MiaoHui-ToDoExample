import firebase from "firebase";
import { nanoid } from "nanoid";

export async function readGroups() {
  const db = firebase.firestore();
  const collectionRef = db.collection("ToDoGroups");

  return await collectionRef.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  });
}

export async function toggleTodoItem(id) {
  const [docId, todoId] = id.split("_");

  const db = firebase.firestore();
  const docRef = db.collection("ToDoGroups").doc(docId);

  docRef.get().then((doc) => {
    const data = doc.data();
    const transformedData = data.items.map((item) => {
      if (item.id !== todoId) return item;

      return {
        ...item,
        done: !item.done,
      };
    });

    docRef.update({ items: transformedData });
  });
}

export async function addTodoItem(docId, name) {
  const db = firebase.firestore();
  const docRef = db.collection("ToDoGroups").doc(docId);

  const todoObject = {
    id: nanoid(6),
    done: false,
    name,
  };

  docRef.update({
    items: firebase.firestore.FieldValue.arrayUnion(todoObject),
  });
}
