#!/usr/bin/env python

import os, sys, getopt
import re
import json
import mimetypes

def listFiles(path):
	if not path.endswith('/'): path += '/'
	files = os.listdir(path)
	arr = []
	for f in files:
		if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
			arr.append([path + f, f])
		if os.path.isdir(path + '/' + f):
			arr.extend(listFiles(path + f + '/'))
	return arr

def packImages(files, output_folder):

	output = None
	data = []
	p = 0
	c = 0
	for fn in files:
		f = open(fn[0], 'r').read()
		l = len(f)
		if output == None: output = f
		else: output = output + f
		data.append([fn[1], p, p + l, mimetypes.guess_type(fn[1])[0] or ""])
		p += l
		c += 1

	open(output_folder + 'sprite.pack', 'w').write(output)
	open(output_folder + 'sprite.json', 'w').write(json.dumps(data))

def main(argv = None):
	path = '.'
	output = '.'
	if argv == None:
		argv = sys.argv

	try:
		opts, args = getopt.getopt(argv[1:], "p:o:k:", [""])
		for option, value in opts:
			if option in ("-p"): path = value
			elif option in ("-o"): output = value
	except Exception, e:
		pass

	if len(path) > 0 and path[-1] != '/': path = path + '/'
	output = output + "/"
	packImages(listFiles(path), output)

if __name__ == "__main__":
	try:
		main()
	except Exception, e:
		print e
		pass
