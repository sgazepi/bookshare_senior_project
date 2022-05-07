import unittest
from run_auction import run_auction

class TestIntervals(unittest.TestCase):

    def test_intervals(self):
        bids = [
            {
                'bid_id': 1,
                'book_id': 100,
                'bidder': 'user1',
                'start_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 0, 'minute': 0},
                'end_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 0, 'minute': 45},
                'duration': 0.75, 
                'bid_value': 10.0,
            },
            {
                'bid_id': 2,
                'book_id': 100,
                'bidder': 'user2',
                'start_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 0, 'minute': 30},
                'end_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 2, 'minute': 0},
                'duration': 1.5, 
                'bid_value': 20.0,
            },
            {
                'bid_id': 3,
                'book_id': 100,
                'bidder': 'user2',
                'start_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 1, 'minute': 0},
                'end_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 2, 'minute': 15},
                'duration': 1.25, 
                'bid_value': 5.0,
            },
            {
                'bid_id': 4,
                'book_id': 100,
                'bidder': 'user2',
                'start_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 1, 'minute': 30},
                'end_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 3, 'minute': 0},
                'duration': 1.5, 
                'bid_value': 20.0,
            },
            {
                'bid_id': 5,
                'book_id': 100,
                'bidder': 'user2',
                'start_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 2, 'minute': 45},
                'end_time': {'year': 2022, 'month': 5, 'date': 3, 'hour': 4, 'minute': 0},
                'duration': 1.25, 
                'bid_value': 15.0,
            },
        ]
        winning_bids = run_auction(bids)
        ids = sorted([winning_bid['bid_id'] for winning_bid in winning_bids])
        self.assertEqual(ids, [2, 5], "Pick 2nd and 5th interval")

if __name__ == '__main__':
    unittest.main()