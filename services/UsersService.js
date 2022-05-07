import * as firebase from 'firebase/compat';
import 'firebase/compat/firestore';
import { collection, getDocs } from "firebase/firestore";

export const getUsers = async () => {
	try {
	  const db = firebase.firestore();
	  const q = collection(db, "users");
	  const all_users = await getDocs(q);
      const all_users_data = []
	  all_users.forEach((user) => {
		all_users_data.push(user.data());
	  });
	  return all_users_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching users");
	}
};

export const findUserByID = async (id) => {
	try {
      const all_users = await getUsers();
      const data = all_users.filter((user) => (user.uid == id));
      if (data.length == 0){
        alert("No user with such id");
      }
	  return data[0];
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching user");
	}
};


export const getUser = async (id) => {
	try {
        const user = await findUserByID(id);
        return {
			username: user.firstName + " " + user.lastName,
			email: user.email,
			phone_number: user.phoneNumber
		};
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching user");
	}
};