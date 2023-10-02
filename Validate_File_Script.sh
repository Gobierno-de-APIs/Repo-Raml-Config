#!/bin/bash
if [ -f $FILENAME_HTML ]
    then
        echo "El archivo existe"
    else
        echo "El archivo NO existe"
        exit 1
fi