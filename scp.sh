

# create build of cikms_ui (npm run build)
# copy build to cikms_ui_server (manual copy )
# create build of cikms_ui_server (npm run build) 






 # step 1 ./scp.sh
 # step 2 ssh -X root@192.168.110.74  password is root@123
 # step 3 ps -ef | grep cikms_ui
 # step 4 look for process id 
 # step 5 kill -9 <process_id>
 # step 6 cd /root/cikms_version/ui/
 # step 7 ./cikms_ui

 
 
 scp -r cikms_ui data.json root@192.168.110.74:/root/cikms_version/ui/

