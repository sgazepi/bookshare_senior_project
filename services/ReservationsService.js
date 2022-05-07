import * as firebase from 'firebase/compat';
import 'firebase/compat/firestore';
import { collection, getDocs } from "firebase/firestore";

export const getReservations = async () => {
	try {
	  const db = firebase.firestore();
	  const q = collection(db, "book_reservations");
	  const all_reservations = await getDocs(q);
	  const all_reservations_data = []
	  all_reservations.forEach((reservation) => {
        var reservation_data = reservation.data()
		all_reservations_data.push(reservation_data);
	  });
	  return all_reservations_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching reservations data");
	}
};

export const getMyReservations = async () => {
	try {
	  const currentUserUID = firebase.auth().currentUser.uid;
      const all_reservations = await getReservations();
	  const all_reservations_data = all_reservations.filter((reservation) => (reservation.renter_id == currentUserUID));
	  return all_reservations_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching my reservation data");
	}
};

export const getReservationsForTextbook = async (id) => {
	try {
      const all_reservations = await getReservations();
      const all_reservations_data = all_reservations.filter((reservation) => (reservation.book_id == id));
	  return all_reservations_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching reservations of textbook {book_id} data");
	}
};


export const register_reservations = (bids) => {
	const db = firebase.firestore();
	const currentUserUID = firebase.auth().currentUser.uid;
	bids.forEach((bid) => {
		const reservation_id = new Date().getTime().toString() + bid.start_time.getTime()/1000;
		db.collection("book_reservations")
			.doc(reservation_id.toString())
			.set({
				reservation_id: reservation_id.toString(),
				book_id: bid.book_id,
				start_time: bid.start_time,
				end_time: bid.end_time,
				duration: bid.duration,
				price: bid.value,
				renter_id: bid.bidder,
				owner_id: currentUserUID,
			});
	});
}