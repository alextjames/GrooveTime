#!/usr/bin/python

from bottle import redirect, response, route, get, view, request, post, debug, run, template, PasteServer
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
        
    return template('groove_results', songs='') 

@post('/groove')
def groove_post():
    title = request.forms.get('Title')
    title = title.strip()
    title = re.sub(r'\s+', '+', title)

    req = urllib2.Request('http://tinysong.com/s/' + title + '?format=json&key=db92a689914d0ce6e15424342d01f6da&limit=32')
    opener = urllib2.build_opener()
    f = opener.open(req)

    songs = json.load(f)
    
    return template('groove_results', songs=songs) 

@route('/groove_list.json')
def groove_list():
    try:
        action = action_queue.get(False)
    except Queue.Empty:
        return

    return json.dumps(action)

action_queue = Queue.Queue()
run(host='0.0.0.0', port=8080, server=PasteServer)
