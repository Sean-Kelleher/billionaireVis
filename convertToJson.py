#Source: https://think.cs.vt.edu/corgis/python/billionaires/billionaires.html
import billionaires
import json

list_of_billionaires = billionaires.get_billionaires()

dataset = []
finance = []
financial = []
industries = []

def makeDataset():
	for item in list_of_billionaires:
		dataset.append({'name': item['name'], 'country': item['location']['citizenship'], 'industry': item['wealth']['how']['industry'], 'category': item['wealth']['how']['category'], 'billions': item['wealth']['worth in billions']})
	#category as '0' is for industry = 'other', '' is diversified financial
	for item in dataset:
		if item['category'] == '0' or item['category'] == '':
				item['category'] = 'Other'
		if item['industry'] == '0' or item['industry'] == '':
				item['industry'] = 'Other'
		if item['category'] == 'Financial':
			item['category'] = 'Finance'

def makeJson():
	js = json.dumps(dataset);
	file = open('billionaires.json', 'w')
	file.write(js)
	file.close()

makeDataset()
makeJson()