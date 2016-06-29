#!/bin/bash
NAME=kahn1990PhotoServer



case $1 in
start)
     echo "Starting $NAME ..."
             pm2 start  ecosystem.json  -i 2  --name kahn1990PhotoServer
     echo "============================"
     echo "$NAME start ok "
        echo "============================"
               ;;
stop)
      echo "Stop  $NAME ..."
           pm2 stop kahn1990PhotoServer

      echo "============================"
      echo "$NAME stop ok"
          echo "============================"

               ;;
*)
echo "Usage: $0 {start|stop}"
esac
exit 0
