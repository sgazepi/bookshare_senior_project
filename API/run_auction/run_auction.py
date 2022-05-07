from datetime import datetime

def get_year (bid):
    return bid['start_time'].year

def get_month (bid):
    return bid['start_time'].month

def get_date (bid):
    return bid['start_time'].date

def get_start_time_in_decimal_format (bid):
    return bid['start_time'].hour + bid['start_time'].minute / 60

# check if time1 occurs bf time2. Note that we know all bids are on same day
def is_time_earlier_or_eq_than (datetime1, datetime2):
    if datetime1.hour < datetime2.hour:
        return True
    if datetime1.hour == datetime2.hour and datetime1.minute <= datetime2.minute:
        return True
    return False


# verify that all bids are for the same day before running auction
def verify_bids_same_day (bids):
    if not bids or len(bids) == 0:
        return True
    
    for bid in bids:
        if get_year(bid) != get_year(bids[0]) or get_month(bid) != get_month(bids[0]) or get_date(bid) != get_date(bids[0]):
            return False
        else:
            return True


def find_last_non_overlapping_interval (sorted_bids):
    num_bids = len (sorted_bids)
    non_overlapping_interval_indices = [-1] * num_bids
    for index in range (1, num_bids):
        prev_index = index - 1
        while prev_index >= 0:
            if is_time_earlier_or_eq_than(sorted_bids[prev_index]['end_time'], sorted_bids [index]['start_time']):
                non_overlapping_interval_indices[index] = prev_index
                break
            else:
                prev_index-=1
    return non_overlapping_interval_indices


# TODO (potentially): what if value of bid is social cost of bid
def find_max_non_overlapping_intervals (bids):
    sorted_bids = sorted(bids, key=lambda bid: get_start_time_in_decimal_format(bid)) 
    num_bids = len (sorted_bids)
    non_overlapping_interval_indices = find_last_non_overlapping_interval (sorted_bids)

    # dynamic programming array, holds largest value up to interval i
    max_solution = [0.0] * num_bids
    max_solution [0] = sorted_bids[0]['value'] * sorted_bids [0]['duration']
    for index in range (1, num_bids):
        total_value = sorted_bids [index]['value'] * sorted_bids [index]['duration']
        # index of last non-overlapping interval
        prev_non_overlap = non_overlapping_interval_indices [index]
        # optimal is the max between including interval
        # TODO: tiebreaker
        max_solution[index] = max (max_solution[prev_non_overlap] + total_value, max_solution[index-1])

    # backtracking
    winning_bids = []
    index = num_bids - 1
    while index >= 0:
        total_value = sorted_bids [index]['value'] * sorted_bids [index]['duration']
        prev_non_overlap = non_overlapping_interval_indices [index]
        if total_value + max_solution [prev_non_overlap] >= max_solution[index-1]:
            winning_bids.append(sorted_bids [index])
            index = prev_non_overlap
        else:
            index -= 1
    return winning_bids


def run_auction (bids):
    if not bids:
        print ('No bids received')
        return []
    if not verify_bids_same_day (bids):
        print ('Error: bids not from same day')
        return []
    else:
        return find_max_non_overlapping_intervals(bids)
  