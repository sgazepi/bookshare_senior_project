import os
import json

from flask import Flask, request
from flask_cors import CORS

from datetime import datetime

from run_auction.run_auction import run_auction

app = Flask(__name__)
cors = CORS(app)

bids = None

@app.route('/bids', methods=['POST', 'GET'])
def get_all_bids():
    message = request.get_json(force=True)
    if 'bids' in message:
        bids = message['bids']
        f = open("bids.txt", "w")
        json.dump(bids, f)
        f.close()
        return 'Success', 200

@app.route('/auction', methods=['GET'])
def get_winning_bids():
    f = open("bids.txt", "r")
    data = f.read()
    bids = json.loads(data)
    num_bids = len(bids)
    # convert json date to python datetime
    for index in range (num_bids):
        start_time = bids[index]['start_time']
        end_time = bids[index]['end_time']
        bids[index]['start_time'] = datetime.strptime(start_time, '%Y-%m-%dT%H:%M:%S.%fZ')
        bids[index]['end_time'] = datetime.strptime(end_time, '%Y-%m-%dT%H:%M:%S.%fZ')
    winning_bids = run_auction(bids)
    return {"winning_bids": winning_bids}

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
    