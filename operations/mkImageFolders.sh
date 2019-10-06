#!/bin/bash    
FILES=~/Software/HTML/ArientiDentalClinic/public/servizi/*.html
    for f in $FILES
    do
        filename=$(basename ${f%.*})
        echo $filename
        mkdir ~/Software/HTML/ArientiDentalClinic/public/asset/img/servizi/$filename
    done