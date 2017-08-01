#Source: https://think.cs.vt.edu/corgis/python/billionaires/billionaires.html
import billionaires
import json

list_of_billionaires = billionaires.get_billionaires()

dataset = []
byYear = {};

def ave(l):
	total = 0
	for item in l:
		total = total + float(item['billions'])
	average = total/len(l)
	return average

def makeDataset():
	for item in list_of_billionaires:
		byYear[item['name']] = []
		#byYear.append({'name': item['name'], 'industry': item['wealth']['how']['industry'], 'billions': item['wealth']['worth in billions'], 'year': item['year']})
	for item in list_of_billionaires:
		byYear[item['name']].append({'name': item['name'], 'industry': item['wealth']['how']['industry'], 'billions': item['wealth']['worth in billions'], 'year': item['year']})
	#category as '0' is for industry = 'other', '' is diversified financial	
	for item in list_of_billionaires:
		person = {'name': item['name'], 'industry': item['wealth']['how']['industry'], 'billions': ave(byYear[item['name']])}
		if person not in dataset:
			dataset.append(person)
	for item in dataset:
		if item['industry'] == '0' or item['industry'] == '':
			item['industry'] = 'Other'

		
def makeJson():
	js = json.dumps(dataset);
	file = open('billionaires.json', 'w')
	file.write(js)
	file.close()

makeDataset()
makeJson()