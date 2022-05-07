import * as firebase from 'firebase/compat';
import 'firebase/compat/firestore';
import { collection, getDocs } from "firebase/firestore";
import {getStorage, ref, getDownloadURL} from 'firebase/storage';

export const getTextbooks = async () => {
	try {
	const storage = await getStorage();
	  const db = firebase.firestore();
	  const q = collection(db, "available_books");
	  const all_textbooks = await getDocs(q);
	  const all_textbooks_data = []
	  all_textbooks.forEach((book) => {
		all_textbooks_data.push(book.data());
	  });
	  textbook_length = all_textbooks_data.length;
	  for (let index = 0; index < textbook_length; index++) {
		const reference = ref(storage, '/'+ all_textbooks_data[index].image);
		await getDownloadURL(reference).then((x) => {
			all_textbooks_data[index].image = x;
		})
	  }
	  return all_textbooks_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching textbook data");
	}
};

export const getTextbook = async (id) => {
	try {
	  const all_texbooks = await getTextbooks();
	  const textbook = all_texbooks.filter((book) => (book.book_id == id))[0];
	  return textbook;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching textbook {book_id} data");
	}
};

export const getMyTextbooks = async () => {
	try {
	  const all_texbooks = await getTextbooks();
	  const currentUserUID = firebase.auth().currentUser.uid;
	  const my_textbooks = all_texbooks.filter((book) => (book.owner == currentUserUID));
	  return my_textbooks;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching my textbook data");
	}
};

export const register_new_textbook = async (name, author, description, price, image) => { 
	const db = firebase.firestore();
	const currentUserUID = firebase.auth().currentUser.uid;
	const book_id = new Date().getTime().toString();
	db.collection("available_books")
	  .doc(book_id)
	  .set({
		book_id: book_id,
		name: name,
		author: author,
		description: description,
		price: price,
		owner: currentUserUID,
		image: image,
	  });
  }