import * as firebase from 'firebase/compat';
import 'firebase/compat/firestore';
import { collection, getDocs } from "firebase/firestore";

export const getBids = async () => {
	try {
	  const db = firebase.firestore();
	  const q = collection(db, "bids");
	  const all_bids = await getDocs(q);
	  const all_bids_data = []
	  all_bids.forEach((bid) => {
        var bid_data = bid.data()
        bid_data.start_time = new Date(bid_data.start_time.seconds * 1000);
        bid_data.end_time = new Date(bid_data.end_time.seconds * 1000);
		all_bids_data.push(bid_data);
	  });
	  return all_bids_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching bids data");
	}
};

export const getMyBids = async () => {
	try {
	  const currentUserUID = firebase.auth().currentUser.uid;
      const all_bids = await getBids();
	  const myBids_data = all_bids.filter((bid) => (bid.bidder == currentUserUID));
	  return myBids_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching my bid data");
	}
};

export const getBidsForTextbook = async (id) => {
	try {
      const all_bids = await getBids();
      const bids_data = all_bids.filter((bid) => (bid.book_id == id));
	  return bids_data;
	} catch (err) {
	  console.error(err);
	  alert("An error occured while fetching bids of textbook {book_id} data");
	}
};

export const getBidsForTextbookOnDate = async (book_id, date) => {
    try {
        const bidsForTextbook = await getBidsForTextbook(book_id);
        const  bidsForTextbookOnDate = 
            bidsForTextbook.filter((bid) => (date.getFullYear() == bid.start_time.getFullYear() 
                && date.getMonth() == bid.start_time.getMonth() 
                && date.getDate() == bid.start_time.getDate()));
        return bidsForTextbookOnDate;
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching bids of textbook {book_id} for {date} data");
    }
}

export const register_bid = async (book_id, start_time, end_time, duration, value) => { 
	const db = firebase.firestore();
	const currentUserUID = firebase.auth().currentUser.uid;
	const bid_id = new Date().getTime().toString();
	db.collection("bids")
	  .doc(bid_id)
	  .set({
		bid_id: bid_id,
		book_id: book_id,
		start_time: start_time,
		end_time: end_time,
		duration: duration,
		value: value,
		bidder: currentUserUID,
	});
}