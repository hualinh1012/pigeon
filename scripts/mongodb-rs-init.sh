#!/bin/bash
# Initialize mongodb replica set...
docker exec -it mongo1 mongo --eval "rs.initiate({'_id':'dbrs','version':1,'members':[{'_id':1,'host':'mongo1:27017','priority':3},{'_id':2,'host':'mongo2:27018','priority':2},{'_id':3,'host':'mongo3:27019','priority':1}]}, { force: true });"
docker exec -it mongo1 mongo --eval "rs.status();"