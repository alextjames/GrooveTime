#!/usr/bin/python

from bottle import redirect, response, route, get, view, request, post, debug, run, template
import urllib2
import json
import re
import Queue
import sys

@get('/groove')
def groove_form():
    if request.query.action:
        action_queue.put(dict(request.query));
        return ""
        
    return template('groove_results', songs='', ip=ip) 

@post('/groove')
def groove_post():
    title = request.forms.get('Title')
    title = title.strip()
    title = re.sub(r'\s+', '+', title)

    req = urllib2.Request('http://tinysong.com/s/' + title + '?format=json&key=db92a689914d0ce6e15424342d01f6da&limit=32')
    opener = urllib2.build_opener()
    f = opener.open(req)

    songs = json.load(f)
    
    return template('groove_results', songs=songs, ip=ip) 

@route('/groove_list.json')
def groove_list():
    callback = request.query.callback
    response.content_type = 'text/javascript'
    
    try:
        action = action_queue.get(False)
    except Queue.Empty:
        return

    return callback + '(' + json.dumps(action) + ')'

if len(sys.argv) != 2:
    print "Please specify the ip address as the first argument"
    sys.exit()

ip=sys.argv[1]
action_queue = Queue.Queue()
run(host='0.0.0.0', port=8080)
